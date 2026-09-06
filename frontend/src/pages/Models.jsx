import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BriefcaseBusiness, ArrowRight, Brain } from "lucide-react";

const Models = () => {
    const navigate = useNavigate();

    const models = [
        {
            title: "Student",
            subtitle: "Social Media & Mental Health",
            description:
                "Analyze how social media usage may be affecting your mental health, stress, sleep, and daily well-being.",
            icon: GraduationCap,
            route: "/student-mental-health",
        },
        {
            title: "Working Professional",
            subtitle: "Stress Detection",
            description:
                "Evaluate your stress level using lifestyle, work, sleep, and daily activity patterns.",
            icon: BriefcaseBusiness,
            route: "/working-stress-detection",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 py-12">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-900 text-white shadow-lg">
                        <Brain size={32} />
                    </div>

                    <h1 className="text-3xl font-bold text-green-950 md:text-4xl">
                        Choose Your Assessment
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-gray-600">
                        Tell us a little about yourself and choose the assessment
                        designed for your lifestyle.
                    </p>
                </div>

                {/* Question */}
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
                        Are you a student or a working professional?
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-2">

                    {models.map((model) => {
                        const Icon = model.icon;

                        return (
                            <button
                                key={model.title}
                                onClick={() => navigate(model.route)}
                                className="group text-left"
                            >
                                <div className="relative h-full overflow-hidden rounded-3xl border border-green-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl">

                                    {/* Decorative circle */}
                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-150" />

                                    {/* Icon */}
                                    <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition-all duration-300 group-hover:bg-green-900 group-hover:text-white">
                                        <Icon size={28} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <p className="mb-1 text-sm font-medium uppercase tracking-wider text-green-700">
                                            Assessment
                                        </p>

                                        <h3 className="text-2xl font-bold text-green-950">
                                            {model.title}
                                        </h3>

                                        <h4 className="mt-1 text-lg font-semibold text-gray-700">
                                            {model.subtitle}
                                        </h4>

                                        <p className="mt-4 leading-7 text-gray-600">
                                            {model.description}
                                        </p>

                                        {/* Button */}
                                        <div className="mt-7 flex items-center gap-2 font-semibold text-green-800 transition-all duration-300 group-hover:gap-4">
                                            Start Assessment
                                            <ArrowRight size={19} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}

                </div>

                {/* Bottom note */}
                <p className="mt-10 text-center text-sm text-gray-500">
                    Your responses are used only to provide an assessment based on
                    the information you provide.
                </p>
            </div>
        </div>
    );
};

export default Models;