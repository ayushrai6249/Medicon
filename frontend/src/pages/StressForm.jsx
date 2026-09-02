import React, { useState } from "react";

const occupations = [
    "Teacher",
    "Chef",
    "Nurse",
    "Photographer",
    "Architect",
    "Scientist",
    "Electrician",
    "Graphic Designer",
    "Software Engineer",
    "Software Developer",
    "Journalist",
    "Construction Worker",
    "HR Manager",
    "Project Manager",
    "Web Developer",
    "Accountant",
    "Data Scientist",
    "Data Analyst",
    "Civil Engineer",
    "Marketing Executive",
    "Truck Driver",
    "Marketing Manager",
    "Financial Analyst",
    "Engineer",
    "Plumber",
    "Marketing Specialist",
    "Sales Manager",
    "Sales Representative",
    "HR Specialist",
    "Interior Designer",
    "Librarian",
    "Artist",
    "Police Officer",
    "Content Writer",
    "Doctor",
    "Social Worker",
    "Veterinarian",
    "Construction Manager",
    "Business Analyst",
    "Mechanic",
    "Real Estate Agent",
    "Mechanical Engineer",
    "Psychologist",
    "Farmer",
    "Lawyer",
    "Writer",
    "Carpenter",
    "Fashion Designer",
    "IT Consultant",
    "Other",
];

const exerciseTypes = [
    "Cardio",
    "Yoga",
    "Strength Training",
    "Aerobics",
    "Walking",
    "Pilates",
    "Meditation",
];

const wakeUpTimes = [
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
];
const bedTimes = [
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
    "12:00 AM",
    "12:30 AM",
    "1:00 AM",
];

const initialForm = {
    Age: 25,
    Gender: "Male",
    Occupation: "Other",
    Marital_Status: "Single",
    Sleep_Duration: 7,
    Sleep_Quality: 4,
    Wake_Up_Time: "7:00 AM",
    Bed_Time: "10:00 PM",
    Physical_Activity: 2,
    Screen_Time: 4,
    Caffeine_Intake: 1,
    Alcohol_Intake: 0,
    Smoking_Habit: "No",
    Work_Hours: 8,
    Travel_Time: 1,
    Social_Interactions: 5,
    Meditation_Practice: "No",
    Exercise_Type: "Cardio",
    Blood_Pressure: 120,
    Cholesterol_Level: 180,
    Blood_Sugar_Level: 90,
};

const StressForm = () => {
    const [form, setForm] = useState(initialForm);
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const [birthDate, setBirthDate] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        const numericFields = [
            "Sleep_Duration",
            "Sleep_Quality",
            "Physical_Activity",
            "Screen_Time",
            "Caffeine_Intake",
            "Alcohol_Intake",
            "Work_Hours",
            "Travel_Time",
            "Social_Interactions",
            "Blood_Pressure",
            "Cholesterol_Level",
            "Blood_Sugar_Level",
        ];

        setForm((prev) => ({
            ...prev,
            [name]: numericFields.includes(name)
                ? Number(value)
                : value,
        }));
    };

    // Calculate age from date of birth
    const calculateAge = (dob) => {
        const today = new Date();
        const birth = new Date(dob);

        let age = today.getFullYear() - birth.getFullYear();

        const monthDiff =
            today.getMonth() - birth.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 &&
                today.getDate() < birth.getDate())
        ) {
            age--;
        }

        return age;
    };

    const handleBirthDate = (e) => {
        const dob = e.target.value;

        if (!dob) {
            setBirthDate("");
            return;
        }

        const age = calculateAge(dob);

        setBirthDate(dob);

        if (age >= 17 && age <= 60) {
            setForm((prev) => ({
                ...prev,
                Age: age,
            }));
        }
    };

    const clearForm = () => {
        setForm(initialForm);
        setBirthDate("");
        setPrediction("");
        setShowResult(false);
    };

    const getExplanation = () => {
        if (!prediction) {
            return "Fill in your details and click Predict to see your stress level.";
        }

        if (prediction === "High") {
            return "Your lifestyle indicators suggest a higher level of stress. Consider improving sleep, reducing screen time and caffeine, maintaining physical activity, and taking regular breaks.";
        }

        if (prediction === "Medium") {
            return "Your indicators suggest a moderate level of stress. Maintaining healthy sleep, exercise, social interaction, and relaxation habits may help reduce stress.";
        }

        if (prediction === "Low") {
            return "Your lifestyle indicators suggest a lower stress level. Continue maintaining healthy sleep, activity, social interaction, and relaxation habits.";
        }

        return "Prediction completed.";
    };

    const handlePredict = async () => {
        setLoading(true);
        setPrediction("");

        try {
            const response = await fetch(
                "https://stress-detection-vjh6.onrender.com/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            if (!response.ok) {
                throw new Error("Prediction request failed");
            }

            const data = await response.json();

            setPrediction(data.prediction);
            setShowResult(true);
        } catch (error) {
            console.error(error);

            setPrediction("Error");
            setShowResult(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 lg:grid-cols-2">


                <div
                    className={`rounded-2xl bg-white p-6 shadow-lg transition-transform duration-700 ease-in-out ${showResult
                        ? "-translate-x-4 lg:-translate-x-8"
                        : "translate-x-0"
                        }`}
                >
                    <h2 className="mb-6 text-2xl font-bold text-slate-800">
                        Stress Assessment
                    </h2>

                    <div className="space-y-6">

                        {/* Date of Birth */}

                        <div>
                            <label className="mb-2 block font-medium">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                value={birthDate}
                                onChange={handleBirthDate}
                                className="w-full rounded-lg border p-3"
                            />

                            <p className="mt-1 text-sm text-slate-500">
                                Age must be between 17 and 60 years.
                            </p>

                            {birthDate && (
                                <p className="mt-1 text-sm font-medium">
                                    Age: {form.Age}
                                </p>
                            )}
                        </div>

                        {/* Gender */}

                        <div>
                            <label className="mb-2 block font-medium">
                                Gender
                            </label>

                            <div className="flex gap-6">
                                {["Male", "Female"].map(
                                    (item) => (
                                        <label
                                            key={item}
                                            className="flex gap-2"
                                        >
                                            <input
                                                type="radio"
                                                name="Gender"
                                                value={item}
                                                checked={
                                                    form.Gender ===
                                                    item
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                            {item}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Occupation */}

                        <div>
                            <label className="mb-2 block font-medium">
                                Occupation
                            </label>

                            <select
                                name="Occupation"
                                value={form.Occupation}
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-400"
                            >
                                {occupations.map(
                                    (occupation) => (
                                        <option
                                            key={occupation}
                                            value={occupation}
                                        >
                                            {occupation}
                                        </option>
                                    )
                                )}
                            </select>

                            <p className="mt-1 text-xs text-slate-400">
                                Select your occupation from the list.
                            </p>
                        </div>

                        {/* Marital Status */}

                        <div>
                            <label className="mb-2 block font-medium">
                                Marital Status
                            </label>

                            <div className="flex flex-wrap gap-5">
                                {[
                                    "Single",
                                    "Married",
                                    "Divorced",
                                ].map((item) => (
                                    <label
                                        key={item}
                                        className="flex gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="Marital_Status"
                                            value={item}
                                            checked={
                                                form.Marital_Status ===
                                                item
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sleep Duration */}

                        <Slider
                            label="Sleep Duration"
                            name="Sleep_Duration"
                            value={form.Sleep_Duration}
                            min={2}
                            max={10}
                            step={0.5}
                            unit="hr"
                            onChange={handleChange}
                        />

                        {/* Sleep Quality */}

                        <Slider
                            label="Sleep Quality"
                            name="Sleep_Quality"
                            value={form.Sleep_Quality}
                            min={1}
                            max={7}
                            step={1}
                            unit="/ 7"
                            onChange={handleChange}
                        />

                        {/* Wake Up Time */}

                        <Select
                            label="Wake Up Time"
                            name="Wake_Up_Time"
                            value={form.Wake_Up_Time}
                            options={wakeUpTimes}
                            onChange={handleChange}
                        />

                        {/* Bed Time */}

                        <Select
                            label="Bed Time"
                            name="Bed_Time"
                            value={form.Bed_Time}
                            options={bedTimes}
                            onChange={handleChange}
                        />

                        {/* Physical Activity */}

                        <Slider
                            label="Physical Activity"
                            name="Physical_Activity"
                            value={form.Physical_Activity}
                            min={0}
                            max={7}
                            step={0.5}
                            unit="hr"
                            onChange={handleChange}
                        />

                        {/* Screen Time */}

                        <Slider
                            label="Screen Time"
                            name="Screen_Time"
                            value={form.Screen_Time}
                            min={0}
                            max={8}
                            step={0.5}
                            unit="hr"
                            onChange={handleChange}
                        />

                        {/* Caffeine */}

                        <Select
                            label="Caffeine Intake"
                            name="Caffeine_Intake"
                            value={form.Caffeine_Intake}
                            options={[
                                {
                                    label: "No",
                                    value: 0,
                                },
                                {
                                    label: "Low",
                                    value: 1,
                                },
                                {
                                    label: "Moderate",
                                    value: 2,
                                },
                                {
                                    label: "High",
                                    value: 3,
                                },
                                {
                                    label: "Extreme",
                                    value: 4,
                                },
                            ]}
                            onChange={handleChange}
                        />

                        {/* Alcohol */}

                        <Select
                            label="Alcohol Intake"
                            name="Alcohol_Intake"
                            value={form.Alcohol_Intake}
                            options={[
                                {
                                    label: "No",
                                    value: 0,
                                },
                                {
                                    label: "Sometimes",
                                    value: 1,
                                },
                                {
                                    label: "Regular",
                                    value: 2,
                                },
                            ]}
                            onChange={handleChange}
                        />

                        {/* Smoking */}

                        <RadioGroup
                            label="Smoking Habit"
                            name="Smoking_Habit"
                            value={form.Smoking_Habit}
                            options={["Yes", "No"]}
                            onChange={handleChange}
                        />

                        {/* Work Hours */}

                        <Slider
                            label="Work Hours"
                            name="Work_Hours"
                            value={form.Work_Hours}
                            min={4}
                            max={14}
                            step={1}
                            unit="hr"
                            onChange={handleChange}
                        />

                        {/* Travel Time */}

                        <Slider
                            label="Travel Time"
                            name="Travel_Time"
                            value={form.Travel_Time}
                            min={0}
                            max={7}
                            step={0.5}
                            unit="hr"
                            onChange={handleChange}
                        />

                        {/* Social Interactions */}

                        <Slider
                            label="Social Interactions"
                            name="Social_Interactions"
                            value={form.Social_Interactions}
                            min={0}
                            max={7}
                            step={0.5}
                            unit="hr"
                            onChange={handleChange}
                        />

                        {/* Meditation */}

                        <RadioGroup
                            label="Meditation Practice"
                            name="Meditation_Practice"
                            value={
                                form.Meditation_Practice
                            }
                            options={["Yes", "No"]}
                            onChange={handleChange}
                        />

                        {/* Exercise */}

                        <Select
                            label="Exercise Type"
                            name="Exercise_Type"
                            value={form.Exercise_Type}
                            options={exerciseTypes}
                            onChange={handleChange}
                        />

                        {/* Blood Pressure */}

                        <Slider
                            label="Blood Pressure"
                            name="Blood_Pressure"
                            value={form.Blood_Pressure}
                            min={110}
                            max={170}
                            step={1}
                            unit="mmHg"
                            onChange={handleChange}
                        />

                        {/* Cholesterol */}

                        <Slider
                            label="Cholesterol Level"
                            name="Cholesterol_Level"
                            value={
                                form.Cholesterol_Level
                            }
                            min={150}
                            max={190}
                            step={1}
                            unit="mg/dL"
                            onChange={handleChange}
                        />

                        {/* Blood Sugar */}

                        <Slider
                            label="Blood Sugar Level"
                            name="Blood_Sugar_Level"
                            value={
                                form.Blood_Sugar_Level
                            }
                            min={80}
                            max={150}
                            step={1}
                            unit="mg/dL"
                            onChange={handleChange}
                        />

                        {/* Buttons */}

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={clearForm}
                                className="flex-1 rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"
                            >
                                Clear
                            </button>

                            <button
                                onClick={handlePredict}
                                disabled={
                                    loading ||
                                    !birthDate ||
                                    form.Age < 17 ||
                                    form.Age > 60
                                }
                                className="flex-1 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Predicting..."
                                    : "Predict"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= RESULT ================= */}

                <div className="rounded-2xl bg-white p-6 shadow-lg lg:sticky lg:top-6">
                    <h2 className="mb-8 text-2xl font-bold text-slate-800">
                        Result
                    </h2>

                    {!prediction && (
                        <div className="flex min-h-[400px] items-center justify-center text-center text-slate-400">
                            <p>
                                Complete the assessment
                                <br />
                                and click Predict.
                            </p>
                        </div>
                    )}

                    {prediction &&
                        prediction !== "Error" && (
                            <div className="space-y-8">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Prediction
                                    </p>

                                    <h1 className="mt-2 text-5xl font-bold">
                                        {prediction}
                                    </h1>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="mb-3 text-lg font-semibold">
                                        Explanation
                                    </h3>

                                    <p className="leading-7 text-slate-600">
                                        {getExplanation()}
                                    </p>
                                </div>
                            </div>
                        )}

                    {prediction === "Error" && (
                        <div className="rounded-lg bg-red-50 p-4 text-red-600">
                            Unable to connect to the prediction API.
                            Make sure FastAPI is running on port 8000.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   REUSABLE COMPONENTS
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
            <div className="mb-2 flex justify-between">
                <label className="font-medium">
                    {label}
                </label>

                <span className="font-semibold">
                    {value} {unit}
                </span>
            </div>

            <input
                type="range"
                name={name}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full"
            />

            <div className="flex justify-between text-xs text-slate-400">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

const Select = ({
    label,
    name,
    value,
    options,
    onChange,
}) => {
    return (
        <div>
            <label className="mb-2 block font-medium">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-400"
            >
                {options.map((option) => {
                    const isObject =
                        typeof option === "object";

                    return (
                        <option
                            key={
                                isObject
                                    ? option.value
                                    : option
                            }
                            value={
                                isObject
                                    ? option.value
                                    : option
                            }
                        >
                            {isObject
                                ? option.label
                                : option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

const RadioGroup = ({
    label,
    name,
    value,
    options,
    onChange,
}) => {
    return (
        <div>
            <label className="mb-2 block font-medium">
                {label}
            </label>

            <div className="flex flex-wrap gap-6">
                {options.map((option) => (
                    <label
                        key={option}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={onChange}
                        />

                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default StressForm;
