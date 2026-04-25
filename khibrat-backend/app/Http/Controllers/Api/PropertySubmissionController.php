<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PropertySubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mpdf\Mpdf;

class PropertySubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lang' => 'required|string|in:ar,en',
            'ownership_type' => 'required|string|in:full,shared',

            'name' => 'required|string|max:255',
            'relation' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',

            'property_area' => 'nullable|string|max:255',
            'property_number' => 'nullable|string|max:255',
            'property_description' => 'nullable|string',

            'total_area' => 'nullable|numeric',
            'total_area_shared' => 'nullable|numeric',
            'sold_area' => 'nullable|numeric',

            'owners' => 'nullable',
            'owners.*' => 'nullable|string|max:255',

            'property_register' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:10240',
            'area_statement' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:10240',
            'survey_plan' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:10240',
            'contracts' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:10240',
            'other_attachments.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:10240',
        ]);

        $propertyRegisterPath = $request->hasFile('property_register')
            ? $request->file('property_register')->store('property-submissions/property-register', 'public')
            : null;

        $areaStatementPath = $request->hasFile('area_statement')
            ? $request->file('area_statement')->store('property-submissions/area-statement', 'public')
            : null;

        $surveyPlanPath = $request->hasFile('survey_plan')
            ? $request->file('survey_plan')->store('property-submissions/survey-plan', 'public')
            : null;

        $contractsPath = $request->hasFile('contracts')
            ? $request->file('contracts')->store('property-submissions/contracts', 'public')
            : null;

        $otherAttachmentsPaths = [];
        if ($request->hasFile('other_attachments')) {
            foreach ($request->file('other_attachments') as $file) {
                $otherAttachmentsPaths[] = $file->store('property-submissions/other-attachments', 'public');
            }
        }

        $submission = PropertySubmission::create([
            'lang' => $validated['lang'],
            'ownership_type' => $validated['ownership_type'],

            'name' => $validated['name'],
            'relation' => $validated['relation'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],

            'property_area' => $validated['property_area'] ?? null,
            'property_number' => $validated['property_number'] ?? null,
            'property_description' => $validated['property_description'] ?? null,

            'total_area' => $validated['total_area'] ?? null,
            'total_area_shared' => $validated['total_area_shared'] ?? null,
            'sold_area' => $validated['sold_area'] ?? null,

            'owners' => $request->input('owners', []),

            'property_register' => $propertyRegisterPath,
            'area_statement' => $areaStatementPath,
            'survey_plan' => $surveyPlanPath,
            'contracts' => $contractsPath,
            'other_attachments' => $otherAttachmentsPaths,
        ]);

        return response()->json([
            'message' => 'Property submission created successfully',
            'data' => $submission,
        ], 201);
    }

    public function index()
    {
        $submissions = PropertySubmission::latest()->get();

        return response()->json([
            'data' => $submissions
        ]);
    }

    public function destroy($id)
    {
        $submission = PropertySubmission::find($id);

        if (!$submission) {
            return response()->json([
                'message' => 'Submission not found'
            ], 404);
        }

        // حذف الملفات إن وجدت
        if ($submission->property_register) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($submission->property_register);
        }

        if ($submission->area_statement) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($submission->area_statement);
        }

        if ($submission->survey_plan) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($submission->survey_plan);
        }

        if ($submission->contracts) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($submission->contracts);
        }

        if (is_array($submission->other_attachments)) {
            foreach ($submission->other_attachments as $file) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($file);
            }
        }

        $submission->delete();

        return response()->json([
            'message' => 'Submission deleted successfully'
        ]);
    }

    public function downloadPdf($id)
    {
        $submission = PropertySubmission::find($id);

        if (!$submission) {
            return response()->json([
                'message' => 'Submission not found'
            ], 404);
        }

        $html = view('pdf.property-submission', [
            'submission' => $submission
        ])->render();

        $mpdf = new \Mpdf\Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font' => 'dejavusans',
            'directionality' => 'rtl',
        ]);

        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;
        $mpdf->WriteHTML($html);

        return response(
            $mpdf->Output('', \Mpdf\Output\Destination::STRING_RETURN),
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="property-submission-' . $submission->id . '.pdf"',
            ]
        );
    }
}