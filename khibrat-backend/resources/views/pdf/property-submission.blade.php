<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تفاصيل الطلب العقاري</title>
    <style>
        body {
            font-family: dejavusans, sans-serif;
            direction: rtl;
            text-align: right;
            unicode-bidi: embed;
            margin: 30px;
            color: #111;
            font-size: 14px;
            line-height: 1.9;
            background: #ffffff;
        }

        h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #0f2f57;
            text-align: center;
        }

        .section {
            margin-bottom: 18px;
            padding: 14px 16px;
            border: 1px solid #dbe6f3;
            border-radius: 10px;
            background: #f8fbff;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #174a84;
        }

        .row {
            margin-bottom: 8px;
        }

        .label {
            font-weight: bold;
            color: #0f2f57;
        }

        ul {
            margin: 8px 0 0;
            padding: 0 18px 0 0;
        }

        li {
            margin-bottom: 4px;
        }

        .image-box {
    margin-top: 15px;
    }

    .image-box img {
        width: 100%;
        max-height: 300px;
        object-fit: contain;
        margin-top: 8px;
        border-radius: 8px;
        border: 1px solid #ccc;
    }
    </style>
</head>
<body>
    <h1>تفاصيل الطلب العقاري</h1>

    <div class="section">
        <div class="section-title">المعلومات الأساسية</div>
        <div class="row"><span class="label">الاسم:</span> {{ $submission->name ?? '-' }}</div>
        <div class="row"><span class="label">العلاقة:</span> {{ $submission->relation ?? '-' }}</div>
        <div class="row"><span class="label">الهاتف:</span> {{ $submission->phone ?? '-' }}</div>
        <div class="row"><span class="label">البريد الإلكتروني:</span> {{ $submission->email ?? '-' }}</div>
    </div>

    <div class="section">
        <div class="section-title">تفاصيل العقار</div>
        <div class="row"><span class="label">المنطقة العقارية:</span> {{ $submission->property_area ?? '-' }}</div>
        <div class="row"><span class="label">رقم العقار:</span> {{ $submission->property_number ?? '-' }}</div>
        <div class="row"><span class="label">نوع الملكية:</span> {{ $submission->ownership_type === 'full' ? 'كامل' : 'شيوع' }}</div>
        <div class="row"><span class="label">المساحة الكاملة:</span> {{ $submission->total_area ?? '-' }}</div>
        <div class="row"><span class="label">المساحة على الشيوع:</span> {{ $submission->total_area_shared ?? '-' }}</div>
        <div class="row"><span class="label">المساحة المباعة:</span> {{ $submission->sold_area ?? '-' }}</div>
        <div class="row"><span class="label">الوصف:</span> {{ $submission->property_description ?? '-' }}</div>
    </div>

    <div class="section">
        <div class="section-title">الملاك</div>
        @if(is_array($submission->owners) && count($submission->owners) > 0)
            <ul>
                @foreach($submission->owners as $owner)
                    <li>{{ $owner }}</li>
                @endforeach
            </ul>
        @else
            <div class="row">لا يوجد ملاك مضافون</div>
        @endif
    </div>

    <div class="section">
        <div class="section-title">تاريخ الإنشاء</div>
        <div class="row">{{ $submission->created_at ? $submission->created_at->format('Y-m-d H:i') : '-' }}</div>
    </div>
    <div class="section">
    <div class="section-title">المرفقات</div>

        @php
            function imgPath($path) {
                return $path ? public_path('storage/' . $path) : null;
            }
        @endphp

        @if($submission->property_register)
            <div class="image-box">
                <div class="label">إخراج قيد عقاري</div>
                <img src="{{ imgPath($submission->property_register) }}">
            </div>
        @endif

        @if($submission->area_statement)
            <div class="image-box">
                <div class="label">بيان مساحة</div>
                <img src="{{ imgPath($submission->area_statement) }}">
            </div>
        @endif

        @if($submission->survey_plan)
            <div class="image-box">
                <div class="label">مخطط مساحي</div>
                <img src="{{ imgPath($submission->survey_plan) }}">
            </div>
        @endif

        @if($submission->contracts)
            <div class="image-box">
                <div class="label">عقود</div>
                <img src="{{ imgPath($submission->contracts) }}">
            </div>
        @endif

        @if(is_array($submission->other_attachments))
            @foreach($submission->other_attachments as $file)
                <div class="image-box">
                    <div class="label">مرفق إضافي</div>
                    <img src="{{ imgPath($file) }}">
                </div>
            @endforeach
        @endif
    </div>
</body>
</html>