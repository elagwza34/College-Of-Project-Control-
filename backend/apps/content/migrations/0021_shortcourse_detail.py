from django.db import migrations, models


DETAILS = {
    "ai-in-project-controls": {
        "positioning": "A practical course for professionals who want to use AI responsibly in project controls, reporting and decision support without replacing professional judgement.",
        "bestFor": [
            "Project controls professionals who work with schedule, cost, risk or performance data.",
            "PMO teams exploring AI-assisted reporting, dashboards and workflow support.",
            "Project managers who need a governed way to test AI tools on real project information.",
        ],
        "learningBlocks": [
            {"title": "Responsible AI use", "body": "Understand where AI can support project work, where it should not be trusted blindly and how to keep human approval in the loop."},
            {"title": "Project data readiness", "body": "Review the quality, structure and limitations of schedule, cost, risk and progress data before using AI-enabled tools."},
            {"title": "Dashboards and reporting", "body": "Explore prompts, workflows and review methods that turn project information into clearer dashboards, summaries and decision packs."},
            {"title": "Governance and assurance", "body": "Create guardrails for confidentiality, traceability, review, escalation and accountable use of AI outputs."},
        ],
        "workplaceOutputs": ["AI use-case register", "Prompt and review checklist", "Project dashboard concept", "Human-in-the-loop approval workflow", "AI risk and governance note"],
        "professionalContext": "PMI's 2026 PMP update highlights AI in project-based scenarios. This course treats AI as supervised professional support, not as a replacement for project controls expertise.",
    },
    "project-planning-control": {
        "positioning": "A controls-focused course for building the discipline to connect scope, schedule, cost, risk and progress into one credible delivery baseline.",
        "bestFor": [
            "Planners, schedulers and project controls analysts developing integrated planning capability.",
            "Project managers who need a stronger grip on baselines, dependencies and progress evidence.",
            "Teams that need common planning language across delivery, cost and reporting.",
        ],
        "learningBlocks": [
            {"title": "Planning foundations", "body": "Structure scope, deliverables, assumptions, dependencies and milestones before building the schedule."},
            {"title": "Schedule and cost links", "body": "Connect time, resource and cost information so that progress reporting supports real control decisions."},
            {"title": "Monitoring and control", "body": "Use progress evidence, variance, forecast confidence and exception reporting to keep plans alive."},
            {"title": "Change and governance", "body": "Apply change-control discipline so that baseline movement is understood, approved and traceable."},
        ],
        "workplaceOutputs": ["Integrated baseline", "Milestone and dependency map", "Progress reporting pack", "Change-control log", "Schedule health review"],
        "professionalContext": "The APM Project Planning & Control qualification is linked to practical guidance on planning, scheduling, monitoring and control across time, cost and risk.",
    },
    "earned-value-management": {
        "positioning": "A performance-measurement course for professionals who need to interpret cost and schedule performance with more confidence than simple spend tracking allows.",
        "bestFor": [
            "Cost engineers and project controllers responsible for performance analysis.",
            "Project managers who need better forecasting and variance interpretation.",
            "Organisations building transparent performance measurement baselines.",
        ],
        "learningBlocks": [
            {"title": "Performance measurement baseline", "body": "Understand how scope, schedule and budget form the reference point for meaningful performance measurement."},
            {"title": "Core EVM measures", "body": "Work with earned value, planned value, actual cost, variance, indices and forecast indicators."},
            {"title": "Data integrity", "body": "Assess whether progress measurement, cost capture and coding structures are reliable enough for EVM."},
            {"title": "Forecast interpretation", "body": "Translate EVM results into delivery conversations about confidence, corrective action and governance."},
        ],
        "workplaceOutputs": ["EVM baseline map", "Variance analysis note", "Forecast dashboard", "Data-quality checklist", "Performance narrative for leaders"],
        "professionalContext": "APM describes Earned Value Management as integrating scope, time and cost objectives and establishing a baseline for performance measurement.",
    },
    "pmi-scheduling-professional": {
        "positioning": "A specialist scheduling course for professionals who create, maintain, analyse and communicate project schedules in complex delivery environments.",
        "bestFor": [
            "Planners and schedulers preparing for a more specialist scheduling role.",
            "Project controls teams managing complex dependencies, resources and timelines.",
            "Professionals considering the PMI-SP certification pathway.",
        ],
        "learningBlocks": [
            {"title": "Schedule strategy", "body": "Define the scheduling approach, governance rhythm, assumptions and stakeholder needs before detail planning begins."},
            {"title": "Schedule development", "body": "Build logic-led schedules with activities, dependencies, constraints, milestones and appropriate levels of detail."},
            {"title": "Monitoring and control", "body": "Update, analyse and report schedule movement, critical path pressure and delivery confidence."},
            {"title": "Schedule communication", "body": "Translate schedule analysis into clear messages for project teams, sponsors and decision forums."},
        ],
        "workplaceOutputs": ["Schedule strategy note", "Logic and dependency review", "Critical path analysis", "Schedule update protocol", "Stakeholder schedule report"],
        "professionalContext": "PMI-SP is a PMI specialist certification focused on project scheduling, with exam domains covering schedule strategy, development, monitoring and stakeholder communications.",
    },
    "apm-risk-management": {
        "positioning": "A risk course for building structured risk thinking that can be used in live projects, controls reviews and delivery decision-making.",
        "bestFor": [
            "Project professionals who contribute to risk management but need a clearer framework.",
            "Controls, PMO and assurance teams who maintain risk registers and escalation routes.",
            "Learners preparing for APM Project Risk Management Level 1 knowledge.",
        ],
        "learningBlocks": [
            {"title": "Risk foundations", "body": "Clarify the difference between uncertainty, risk, issue, assumption and opportunity."},
            {"title": "Identification and ownership", "body": "Develop practical approaches for capturing risks, causes, effects, owners and triggers."},
            {"title": "Assessment and response", "body": "Use qualitative assessment and response planning to support proportionate action."},
            {"title": "Review and escalation", "body": "Keep risk information active through review rhythm, controls evidence and decision escalation."},
        ],
        "workplaceOutputs": ["Improved risk register", "Risk scoring guide", "Response plan", "Escalation criteria", "Risk review pack"],
        "professionalContext": "APM states that its Level 1 Project Risk Management certificate tests foundation knowledge sufficient to contribute to risk management within a project.",
    },
    "managing-portfolios": {
        "positioning": "A portfolio course for professionals who need to connect investment choices, delivery capacity and governance with strategic contribution.",
        "bestFor": [
            "Portfolio managers, PMO leaders and governance teams supporting investment decisions.",
            "Senior managers who need clearer prioritisation and resource trade-off conversations.",
            "Project and programme leaders who want to understand portfolio context.",
        ],
        "learningBlocks": [
            {"title": "Portfolio purpose", "body": "Define how a portfolio contributes to strategy, value and organisational decision-making."},
            {"title": "Prioritisation", "body": "Compare initiatives using contribution, risk, affordability, dependency and capacity considerations."},
            {"title": "Benefits and value", "body": "Connect portfolio choices to measurable benefits, outcomes and strategic impact."},
            {"title": "Governance rhythm", "body": "Create practical portfolio forums, dashboards and escalation paths that support action."},
        ],
        "workplaceOutputs": ["Portfolio prioritisation model", "Investment decision pack", "Benefits map", "Capacity view", "Portfolio governance cadence"],
        "professionalContext": "APMG describes Managing Portfolios as focusing on strategic contribution, prioritising the right projects and balancing available resources.",
    },
    "managing-successful-programmes": {
        "positioning": "A programme-management course for professionals coordinating multiple projects and change activity towards defined outcomes and benefits.",
        "bestFor": [
            "Programme managers and project leaders moving into programme environments.",
            "PMO professionals supporting programme governance, benefits and dependency management.",
            "Business-change teams working across complex initiatives.",
        ],
        "learningBlocks": [
            {"title": "Programme structure", "body": "Understand how programmes organise related projects, change activity, governance and outcomes."},
            {"title": "Benefits realisation", "body": "Connect programme activity to benefits, transition states and stakeholder value."},
            {"title": "Risk and dependency", "body": "Coordinate cross-project dependencies, risks, issues and decision points."},
            {"title": "Stakeholder engagement", "body": "Plan communication, involvement and change leadership across a programme lifecycle."},
        ],
        "workplaceOutputs": ["Programme blueprint", "Benefits profile", "Dependency map", "Programme risk log", "Stakeholder engagement plan"],
        "professionalContext": "PeopleCert describes MSP as a framework for managing complex initiatives, aligning programmes to business objectives and focusing on benefits and stakeholder engagement.",
    },
    "pmp": {
        "positioning": "A PMP preparation course that connects exam readiness with the leadership, technical and business judgement needed in real project environments.",
        "bestFor": [
            "Project managers preparing for the PMP certification route.",
            "Delivery professionals who need broader project management structure and language.",
            "Professionals who want to strengthen leadership, delivery process and business-impact thinking.",
        ],
        "learningBlocks": [
            {"title": "People and leadership", "body": "Develop team leadership, stakeholder engagement, conflict handling and communication judgement."},
            {"title": "Process discipline", "body": "Review planning, delivery, risk, quality, procurement, scope, schedule and change control."},
            {"title": "Business environment", "body": "Connect project decisions to value, compliance, organisational change and strategic outcomes."},
            {"title": "Exam preparation", "body": "Use structured revision, practice questions and scenario discussion to prepare with confidence."},
        ],
        "workplaceOutputs": ["PMP study plan", "Scenario decision log", "Stakeholder strategy", "Integrated delivery checklist", "Exam-readiness review"],
        "professionalContext": "PMI's 2026 PMP update places more emphasis on outcomes, value, business impact, AI, sustainability and stakeholder engagement.",
    },
    "chartered-project-professional": {
        "positioning": "A professional-evidence course for experienced practitioners who need to organise technical knowledge, professional practice and reflective development.",
        "bestFor": [
            "Experienced project professionals considering the APM ChPP route.",
            "Practitioners who need help selecting suitable project examples and evidence.",
            "Professionals building stronger reflective practice and CPD discipline.",
        ],
        "learningBlocks": [
            {"title": "Readiness and route selection", "body": "Review professional activity, CPD position, experience and possible evidence routes."},
            {"title": "Project example selection", "body": "Identify sufficiently strong project examples and describe your role clearly."},
            {"title": "Competence evidence", "body": "Structure concise evidence statements that connect action, judgement, context and result."},
            {"title": "Professional reflection", "body": "Develop CPD, ethical practice and reflection habits that support ongoing professional development."},
        ],
        "workplaceOutputs": ["ChPP readiness map", "Project example shortlist", "Competence evidence draft", "CPD development plan", "Professional reflection log"],
        "professionalContext": "APM guidance highlights CPD, professional conduct, project examples and written competence evidence as important parts of ChPP preparation. APM independently assesses and awards ChPP.",
    },
    "pmi-pmo-certified-professional": {
        "positioning": "A PMO certification-preparation course focused on value-led PMO design, operation, alignment and continuous improvement.",
        "bestFor": [
            "PMO leaders and team members who want to demonstrate specialist PMO capability.",
            "Project managers moving into PMO, portfolio or governance roles.",
            "Organisations that need PMO services to support measurable value rather than reporting alone.",
        ],
        "learningBlocks": [
            {"title": "PMO strategic alignment", "body": "Connect PMO purpose, services and success measures to organisational needs."},
            {"title": "PMO design", "body": "Explore operating models, service catalogues, roles, governance interfaces and maturity considerations."},
            {"title": "PMO operation", "body": "Develop approaches for reporting, standards, assurance, portfolio support and performance rhythm."},
            {"title": "PMO improvement", "body": "Use feedback, maturity evidence and value measures to strengthen PMO credibility over time."},
        ],
        "workplaceOutputs": ["PMO service catalogue", "Operating model map", "PMO value measures", "Governance calendar", "Improvement backlog"],
        "professionalContext": "PMI-PMOCP focuses on leading and shaping PMOs, with exam domains covering PMO strategy, design, operation, improvement and people.",
    },
    "pmo-level-6": {
        "positioning": "A broader PMO development route for professionals building governance, reporting, stakeholder, controls and assurance capability at a more strategic level.",
        "bestFor": [
            "PMO professionals developing from reporting support into trusted decision support.",
            "Project controls and governance practitioners working across complex portfolios.",
            "Managers who need stronger PMO capability without treating the PMO as admin only.",
        ],
        "learningBlocks": [
            {"title": "PMO governance", "body": "Design governance rhythms, decision forums, controls standards and escalation routes."},
            {"title": "Integrated controls", "body": "Bring schedule, cost, risk, quality, change and benefits information into a coherent PMO view."},
            {"title": "Stakeholder leadership", "body": "Build the communication and advisory capability needed for senior stakeholder confidence."},
            {"title": "Evidence and assurance", "body": "Create reliable evidence packs, assurance reviews and improvement actions that leaders can use."},
        ],
        "workplaceOutputs": ["PMO operating model", "Integrated controls dashboard", "Assurance review pack", "Stakeholder reporting framework", "Capability improvement plan"],
        "professionalContext": "This course is positioned as College professional development for PMO capability. External professional recognition remains subject to the requirements of the relevant awarding or professional body.",
    },
}


def add_detail(apps, _schema_editor):
    ShortCourse = apps.get_model("content", "ShortCourse")
    for slug, detail in DETAILS.items():
        ShortCourse.objects.filter(slug=slug).update(detail=detail)


def remove_detail(apps, _schema_editor):
    ShortCourse = apps.get_model("content", "ShortCourse")
    ShortCourse.objects.filter(slug__in=DETAILS.keys()).update(detail={})


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0020_shortcourse"),
    ]

    operations = [
        migrations.AddField(
            model_name="shortcourse",
            name="detail",
            field=models.JSONField(blank=True, default=dict, help_text="Structured course page content: overview, learning blocks, workplace outputs and notes."),
        ),
        migrations.RunPython(add_detail, remove_detail),
    ]
