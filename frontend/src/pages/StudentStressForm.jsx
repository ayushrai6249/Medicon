import React, { useState } from "react";

const StudentStressForm = () => {
    const initialForm = {
        Age: 21,
        Gender: "Male",
        Country: "India",
        Academic_Level: "Undergraduate",
        Most_Used_Platform: "Instagram",
        Purpose_Of_Use: "Education",
        Avg_Daily_Usage_Hours: 4.0,
        Daily_Unlocks: 150,
        Study_Hours: 4.0,
        Physical_Activity_Hours: 2.0,
        Stress_Level: "Low",
        Sleep_Hours_Per_Night: 7.0,
    };

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false);

    const [mentalHealthScore, setMentalHealthScore] = useState(null);
    const [uncertainty, setUncertainty] = useState(null);
    const [interval, setInterval] = useState(null);

    const [error, setError] = useState("");

    const countries = [
        "Other",
        "Canada",
        "USA",
        "India",
        "Australia",
        "UK",
        "Germany",
        "Bangladesh",
        "Brazil",
        "Japan",
        "South Korea",
        "France",
        "Spain",
        "Italy",
        "Mexico",
        "Russia",
        "China",
        "Denmark",
        "Netherlands",
        "Switzerland",
        "Ireland",
        "New Zealand",
        "Singapore",
        "Malaysia",
        "Turkey",
        "UAE",
        "Finland",
        "Poland",
        "Pakistan",
        "Nepal",
        "Sri Lanka",
        "Maldives",
    ];

    const platforms = [
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Snapchat",
        "Twitter",
        "YouTube",
        "TikTok",
        "LINE",
        "KakaoTalk",
        "VKontakte",
        "WhatsApp",
        "WeChat",
    ];

    const academicLevels = [
        "Undergraduate",
        "Graduate",
        "High School",
    ];

    const purposes = [
        "Networking",
        "Education",
        "Entertainment",
        "News",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        const numericFields = [
            "Age",
            "Avg_Daily_Usage_Hours",
            "Daily_Unlocks",
            "Study_Hours",
            "Physical_Activity_Hours",
            "Sleep_Hours_Per_Night",
        ];

        setForm((prev) => ({
            ...prev,
            [name]: numericFields.includes(name)
                ? Number(value)
                : value,
        }));

        setError("");
    };

    const clearForm = () => {
        setForm(initialForm);

        setMentalHealthScore(null);
        setUncertainty(null);
        setInterval(null);

        setError("");
    };

    const handlePredict = async () => {
        setLoading(true);
        setMentalHealthScore(null);
        setUncertainty(null);
        setInterval(null);
        setError("");

        try {
            console.log("Sending data:", form);

            const response = await fetch(
                "https://student-mental-health-prediction-wnf1.onrender.com/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            console.log("API response:", data);

            if (!response.ok) {
                if (Array.isArray(data.detail)) {
                    const validationErrors = data.detail
                        .map((error) => {
                            const field = error.loc?.join(".") || "unknown field";
                            return `${field}: ${error.msg}`;
                        })
                        .join("\n");

                    throw new Error(validationErrors);
                }

                throw new Error(
                    data.detail || "Prediction request failed"
                );
            }

            setMentalHealthScore(
                data.predicted_mental_health_score
            );

            setUncertainty(
                data.uncertainty_std
            );

            setInterval(
                data.approx_interval
            );

        } catch (err) {
            console.error("Prediction error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    /*
     * Score interpretation
     *
     * You can change these ranges according to
     * how your dataset defines the mental health score.
     */

    const getScoreStatus = (score) => {
        if (score === null) {
            return {
                label: "",
                description: "",
                className: "",
            };
        }

        if (score <= 3) {
            return {
                label: "Needs Attention",
                description:
                    "The predicted score suggests that your mental health indicators may need attention.",
                className:
                    "bg-red-50 border-red-200 text-red-700",
            };
        }

        if (score <= 5) {
            return {
                label: "Moderate",
                description:
                    "The predicted score indicates a moderate level of mental health well-being.",
                className:
                    "bg-orange-50 border-orange-200 text-orange-700",
            };
        }

        if (score <= 7) {
            return {
                label: "Good",
                description:
                    "The predicted score indicates generally positive mental health indicators.",
                className:
                    "bg-yellow-50 border-yellow-200 text-yellow-700",
            };
        }

        return {
            label: "Very Good",
            description:
                "The predicted score indicates strong positive mental health indicators.",
            className:
                "bg-green-50 border-green-200 text-green-700",
        };
    };

    const scoreStatus = getScoreStatus(mentalHealthScore);

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">

            {/* ================= HEADER ================= */}

            <div className="mx-auto mb-8 max-w-5xl">

                <div className="mb-2 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                        🧠
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Student Mental Health Assessment
                        </h1>

                        <p className="text-sm text-slate-500">
                            Enter your lifestyle and academic details
                            to estimate your mental health score.
                        </p>
                    </div>

                </div>

            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">

                {/* =====================================================
                    FORM
                ====================================================== */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold text-slate-800">
                            Your Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Provide values within the ranges used by
                            the machine learning model.
                        </p>

                    </div>

                    <div className="space-y-6">

                        {/* AGE */}

                        <Slider
                            label="Age"
                            name="Age"
                            value={form.Age}
                            min={18}
                            max={24}
                            step={1}
                            unit="years"
                            onChange={handleChange}
                        />

                        {/* GENDER */}

                        <RadioGroup
                            label="Gender"
                            name="Gender"
                            value={form.Gender}
                            options={[
                                "Male",
                                "Female",
                            ]}
                            onChange={handleChange}
                        />

                        {/* COUNTRY */}

                        <Select
                            label="Country"
                            name="Country"
                            value={form.Country}
                            options={countries}
                            onChange={handleChange}
                        />


                        {/* ACADEMIC LEVEL */}

                        <Select
                            label="Academic Level"
                            name="Academic_Level"
                            value={form.Academic_Level}
                            options={academicLevels}
                            onChange={handleChange}
                        />

                        {/* PLATFORM */}

                        <Select
                            label="Most Used Platform"
                            name="Most_Used_Platform"
                            value={form.Most_Used_Platform}
                            options={platforms}
                            onChange={handleChange}
                        />

                        {/* PURPOSE */}

                        <Select
                            label="Purpose Of Use"
                            name="Purpose_Of_Use"
                            value={form.Purpose_Of_Use}
                            options={purposes}
                            onChange={handleChange}
                        />

                        <Select
                            label="What Do You Think About Your Stress Level?"
                            name="Stress_Level"
                            value={form.Stress_Level}
                            options={["Low", "Medium", "High", "Very High"]}
                            onChange={handleChange}
                        />

                        {/* DAILY USAGE */}

                        <Slider
                            label="Average Daily Usage"
                            name="Avg_Daily_Usage_Hours"
                            value={form.Avg_Daily_Usage_Hours}
                            min={1}
                            max={8.8}
                            step={0.1}
                            unit="hours"
                            onChange={handleChange}
                        />

                        {/* DAILY UNLOCKS */}

                        <Slider
                            label="Daily Unlocks"
                            name="Daily_Unlocks"
                            value={form.Daily_Unlocks}
                            min={62}
                            max={273}
                            step={1}
                            unit="unlocks"
                            onChange={handleChange}
                        />

                        {/* STUDY HOURS */}

                        <Slider
                            label="Study Hours"
                            name="Study_Hours"
                            value={form.Study_Hours}
                            min={0.3}
                            max={8.3}
                            step={0.1}
                            unit="hours"
                            onChange={handleChange}
                        />

                        {/* PHYSICAL ACTIVITY */}

                        <Slider
                            label="Physical Activity"
                            name="Physical_Activity_Hours"
                            value={form.Physical_Activity_Hours}
                            min={0}
                            max={4.1}
                            step={0.1}
                            unit="hours"
                            onChange={handleChange}
                        />

                        {/* SLEEP */}

                        <Slider
                            label="Sleep Per Night"
                            name="Sleep_Hours_Per_Night"
                            value={form.Sleep_Hours_Per_Night}
                            min={3.6}
                            max={9.9}
                            step={0.1}
                            unit="hours"
                            onChange={handleChange}
                        />

                        {/* BUTTONS */}

                        <div className="flex gap-3 border-t border-slate-100 pt-5">

                            <button
                                type="button"
                                onClick={clearForm}
                                className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Clear
                            </button>

                            <button
                                type="button"
                                onClick={handlePredict}
                                disabled={loading}
                                className="flex-1 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Predicting..."
                                    : "Predict Score"}
                            </button>

                        </div>

                    </div>
                </div>

                {/* =====================================================
                    RESULT
                ====================================================== */}

                <div className="lg:sticky lg:top-6 lg:self-start">

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-6">

                            <h2 className="text-xl font-bold text-slate-800">
                                Assessment Result
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Your predicted mental health score
                                will appear here.
                            </p>

                        </div>

                        {/* ================= EMPTY STATE ================= */}

                        {mentalHealthScore === null && !error && !loading && (
                            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

                                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
                                    🧠
                                </div>

                                <h3 className="text-lg font-semibold text-slate-700">
                                    Ready for assessment
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                    Complete the form and click{" "}
                                    <span className="font-semibold">
                                        Predict Score
                                    </span>{" "}
                                    to estimate your mental health
                                    score.
                                </p>

                            </div>
                        )}

                        {/* ================= LOADING ================= */}

                        {loading && (
                            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

                                <div className="mb-5 h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-700" />

                                <h3 className="font-semibold text-slate-700">
                                    Analyzing your information...
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Please wait while the model generates
                                    your prediction.
                                </p>

                            </div>
                        )}

                        {/* ================= ERROR ================= */}

                        {error && !loading && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">

                                <p className="font-semibold">
                                    Prediction Failed
                                </p>

                                <p className="mt-1 text-sm">
                                    {error}
                                </p>

                            </div>
                        )}

                        {/* ================= RESULT ================= */}

                        {mentalHealthScore !== null && !loading && !error && (
                            <div className="space-y-5">

                                {/* SCORE */}

                                <div
                                    className={`rounded-2xl border p-6 ${scoreStatus.className}`}
                                >

                                    <p className="text-sm font-medium opacity-80">
                                        Predicted Mental Health Score
                                    </p>

                                    <div className="mt-2 flex items-end gap-2">

                                        <h3 className="text-5xl font-bold">
                                            {Number(
                                                mentalHealthScore
                                            ).toFixed(2)}
                                        </h3>

                                        <span className="mb-2 text-sm opacity-70">
                                            / 10
                                        </span>

                                    </div>

                                    <p className="mt-3 text-sm font-semibold">
                                        {scoreStatus.label}
                                    </p>

                                </div>

                                {/* SCORE SCALE */}

                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="mb-2 flex justify-between text-xs text-slate-400">

                                        <span>
                                            0
                                        </span>

                                        <span>
                                            10
                                        </span>

                                    </div>

                                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                                        <div
                                            className="h-full rounded-full bg-green-600 transition-all duration-700"
                                            style={{
                                                width: `${Math.min(
                                                    Math.max(mentalHealthScore * 10, 0),
                                                    100
                                                )}%`,
                                            }}
                                        />

                                    </div>

                                    <p className="mt-2 text-center text-xs text-slate-500">
                                        Mental health score
                                    </p>

                                </div>

                                {/* UNCERTAINTY */}

                                {uncertainty !== null && (
                                    <div className="rounded-xl border border-slate-200 p-5">

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <h3 className="font-semibold text-slate-800">
                                                    Prediction Uncertainty
                                                </h3>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Standard deviation of
                                                    the prediction.
                                                </p>

                                            </div>

                                            <span className="text-xl font-bold text-slate-800">
                                                ±{" "}
                                                {Number(
                                                    uncertainty
                                                ).toFixed(2)}
                                            </span>

                                        </div>

                                    </div>
                                )}

                                {/* APPROXIMATE INTERVAL */}

                                {interval && (
                                    <div className="rounded-xl border border-slate-200 p-5">

                                        <h3 className="font-semibold text-slate-800">
                                            Approximate Prediction Interval
                                        </h3>

                                        <div className="mt-4 flex items-center justify-between">

                                            <div className="text-center">

                                                <p className="text-xs text-slate-500">
                                                    Lower
                                                </p>

                                                <p className="mt-1 text-2xl font-bold text-slate-700">
                                                    {Number(
                                                        interval.lower
                                                    ).toFixed(2)}
                                                </p>

                                            </div>

                                            <div className="mx-4 h-px flex-1 bg-slate-200" />

                                            <div className="text-center">

                                                <p className="text-xs text-slate-500">
                                                    Predicted
                                                </p>

                                                <p className="mt-1 text-2xl font-bold text-green-700">
                                                    {Number(
                                                        mentalHealthScore
                                                    ).toFixed(2)}
                                                </p>

                                            </div>

                                            <div className="mx-4 h-px flex-1 bg-slate-200" />

                                            <div className="text-center">

                                                <p className="text-xs text-slate-500">
                                                    Upper
                                                </p>

                                                <p className="mt-1 text-2xl font-bold text-slate-700">
                                                    {Number(
                                                        interval.upper
                                                    ).toFixed(2)}
                                                </p>

                                            </div>

                                        </div>

                                        <p className="mt-4 text-xs leading-5 text-slate-500">
                                            The approximate interval shows
                                            the range around the predicted
                                            score based on model uncertainty.
                                        </p>

                                    </div>
                                )}

                                {/* INTERPRETATION */}

                                <div className="rounded-xl bg-slate-50 p-5">

                                    <h3 className="font-semibold text-slate-800">
                                        Interpretation
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {scoreStatus.description}
                                    </p>

                                </div>

                                {/* DISCLAIMER */}

                                <div className="rounded-xl border border-slate-200 bg-white p-4">

                                    <p className="text-xs leading-5 text-slate-500">
                                        This prediction is generated by a
                                        machine learning model and should be
                                        considered an estimate rather than a
                                        medical diagnosis.
                                    </p>

                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};


/* =========================================================
   SLIDER COMPONENT
========================================================= */

const Slider = ({
    label,
    name,
    value,
    min,
    max,
    step,
    unit,
    onChange,
}) => {
    return (
        <div>

            <div className="mb-2 flex items-center justify-between">

                <label
                    htmlFor={name}
                    className="font-medium text-slate-700"
                >
                    {label}
                </label>

                <span className="rounded-lg bg-green-50 px-2.5 py-1 text-sm font-semibold text-green-700">
                    {value} {unit}
                </span>

            </div>

            <input
                id={name}
                type="range"
                name={name}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full accent-green-700"
            />

            <div className="flex justify-between text-xs text-slate-400">

                <span>
                    {min}
                </span>

                <span>
                    {max}
                </span>

            </div>

        </div>
    );
};


/* =========================================================
   SELECT COMPONENT
========================================================= */

const Select = ({
    label,
    name,
    value,
    options,
    onChange,
}) => {
    return (
        <div>

            <label
                htmlFor={name}
                className="mb-2 block font-medium text-slate-700"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >

                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}

            </select>

        </div>
    );
};


/* =========================================================
   RADIO GROUP
========================================================= */

const RadioGroup = ({
    label,
    name,
    value,
    options,
    onChange,
}) => {
    return (
        <div>

            <label className="mb-3 block font-medium text-slate-700">
                {label}
            </label>

            <div className="flex gap-3">

                {options.map((option) => (

                    <label
                        key={option}
                        className={`flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${value === option
                            ? "border-green-600 bg-green-50 text-green-700"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                    >

                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={onChange}
                            className="accent-green-700"
                        />

                        {option}

                    </label>

                ))}

            </div>

        </div>
    );
};

export default StudentStressForm;
