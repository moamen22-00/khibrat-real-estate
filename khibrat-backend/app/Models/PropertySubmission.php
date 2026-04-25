<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertySubmission extends Model
{
    protected $fillable = [
        'lang',
        'ownership_type',
        'name',
        'relation',
        'phone',
        'email',
        'property_area',
        'property_number',
        'property_description',
        'total_area',
        'total_area_shared',
        'sold_area',
        'owners',
        'property_register',
        'area_statement',
        'survey_plan',
        'contracts',
        'other_attachments',
    ];

    protected $casts = [
        'owners' => 'array',
        'other_attachments' => 'array',
    ];
}