from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.content.models import Page, PageSection, PublicationStatus


class Command(BaseCommand):
    help = "Create or refresh the supporting pages based on the supplied project reference."

    def truncate_on_word(self, value, limit):
        if len(value) <= limit:
            return value
        truncated = value[:limit]
        last_space = truncated.rfind(" ")
        if last_space > 0:
            truncated = truncated[:last_space]
        return truncated.rstrip(" ,;:-")

    def add_page(self, slug, title, summary, sections):
        page, _ = Page.objects.update_or_create(
            slug=slug,
            defaults={
                "title": title,
                "navigation_title": title,
                "summary": summary,
                "status": PublicationStatus.PUBLISHED,
                "is_homepage": False,
                "seo_title": self.truncate_on_word(title, 70),
                "seo_description": self.truncate_on_word(summary, 170),
                "published_at": timezone.now(),
            },
        )
        page.sections.all().delete()
        for index, section in enumerate(sections, start=1):
            PageSection.objects.create(
                page=page,
                internal_name=section["name"],
                section_type=section["type"],
                order=index * 10,
                anchor_id=section.get("anchor", ""),
                style_variant=section.get("variant", "default"),
                content=section["content"],
            )

    def hero(self, eyebrow, title, accent, body, primary="Book a consultation"):
        return {
            "name": "Hero",
            "type": PageSection.SectionType.HERO,
            "anchor": "hero",
            "content": {
                "eyebrow": eyebrow,
                "title": title,
                "titleAccent": accent,
                "body": body,
                "primaryCta": {"label": primary, "url": "/contact"},
                "secondaryCta": {"label": "Explore programmes", "url": "/programmes"},
            },
        }

    def faq(self, items):
        return {
            "name": "Frequently asked questions",
            "type": PageSection.SectionType.FAQ,
            "anchor": "faq",
            "content": {"heading": "Common questions", "items": items},
        }

    def cta(self, heading, body, label="Book a consultation"):
        return {
            "name": "Closing call to action",
            "type": PageSection.SectionType.CTA,
            "content": {
                "heading": heading,
                "body": body,
                "cta": {"label": label, "url": "/contact"},
            },
        }

    def pcp_master_faqs(self):
        return [
            {"id": "who", "question": "Who is the programme for?", "answer": "The Project Controls Professional Level 6 is designed for professionals already responsible for project planning, scheduling, cost, Earned Value, risk, PMO, governance, reporting or project controls delivery. It is for people who want to build structured capability in their current role and progress towards senior professional responsibilities."},
            {"id": "routes", "question": "What are the Operational, Strategic and Chartered Routes?", "answer": "The Operational Route focuses on planning, scheduling, Earned Value Management, controls and delivery performance. The Strategic Route develops programme, portfolio, PMO and governance capability. The Chartered Route is designed for experienced professionals building advanced PMO / Project Controls development, recognised technical knowledge and Chartered Project Professional progression."},
            {"id": "choose", "question": "How do I choose my Route?", "answer": "Your route should reflect the responsibilities you have today and the direction you want to build towards. The College provides a professional consultation to help you choose the right route based on your role, experience, sector and professional objectives."},
            {"id": "tailor", "question": "Can I tailor my module mix?", "answer": "Yes. A tailored module combination may be discussed with the College based on your professional responsibilities and the capability your employer needs. This is not a fourth route — it is a flexible arrangement within the programme architecture."},
            {"id": "module-structure", "question": "How does the module structure work?", "answer": "The programme uses nine specialist modules across three core areas. Each module is selected based on the route you choose or the tailored combination agreed with the College. All modules are delivered through structured professional development with workplace application, one-to-one tutoring and regular progress reviews."},
            {"id": "nine-modules", "question": "What are the nine specialist modules?", "answer": "The nine specialist modules are: Project Management Professional (PMP), AI in Project Controls, Risk Management, Scheduling Professional (SP), Earned Value Management (EVM), Project Planning and Controls (PPC), Managing Successful Programmes (MSP), Management of Portfolios, and Project Management Office (PMO)."},
            {"id": "every-module", "question": "Do I need to take every module?", "answer": "No. You take the modules relevant to your route or tailored combination. The College will advise which modules align with your professional responsibilities and which build the capability you need for your next role."},
            {"id": "workplace-application", "question": "How is workplace application used?", "answer": "Every module is applied to your current professional environment. You produce real plans, schedules, risk registers, cost reports, governance frameworks and performance reviews that strengthen live project delivery. This evidence is reviewed, validated and documented as part of your professional development."},
            {"id": "experts", "question": "Who are the programme experts?", "answer": "The programme is supported by recognised specialists including Steven Wake (Earned Value Management, Project Controls standards), Stephen Jenner (Portfolio Management, Benefits, Governance), Dr Amgad Badewi (Project Controls, Professional Development, Project Management), Ray Mead (PMO, Governance, Transformation) and Andrew Millington (Complex Programmes, Capability Development, Project Controls)."},
            {"id": "recognition", "question": "What professional recognition pathways are available?", "answer": "The College partners with PMI, APMG International, PeopleCert/AXELOS, APM and IPC. The programme includes structured support for professional recognition pathways, relevant professional body exams and memberships where applicable. Professional recognition is subject to meeting professional body criteria and assessment processes."},
            {"id": "chartered-route", "question": "What is the Chartered Route?", "answer": "The Chartered Route is designed for experienced professionals whose priority is advanced PMO / Project Controls development, recognised technical knowledge and Chartered Project Professional progression. It includes structured evidence development, professional practice review and support for Chartered Project Professional (ChPP) readiness."},
            {"id": "chpp-guarantee", "question": "Does completing the Chartered Route automatically award ChPP?", "answer": "No. The Chartered Route includes ChPP readiness support to help you prepare professional evidence, reflect on practice and build confidence for future Chartered Project Professional pathway progression. ChPP is awarded independently by the Association for Project Management based on their assessment criteria. The College does not guarantee or imply automatic ChPP award."},
            {"id": "ipc-support", "question": "How does IPC scholarship or bursary support work?", "answer": "The International Project Management Association (IPC) provides scholarships and bursary support for eligible professionals. The College coordinates this support for professionals on the programme. It is subject to IPC availability and eligibility. The College provides a link to IPC for scholarship queries but does not control or fund these awards."},
            {"id": "ipc-percentage", "question": "Why can support be 50% or 75%?", "answer": "IPC support is available at 50% or 75% depending on the selected Project Controls module. The specific percentage depends on the module and the IPC criteria that apply to that module. The College provides guidance on which modules attract which level of support."},
            {"id": "multiple-employees", "question": "Can an employer develop several people?", "answer": "Yes. The programme can support multiple professionals simultaneously. The College provides a dedicated account manager, structured programme management, individual progress tracking and the ability to align module combinations with employer priorities."},
            {"id": "sectors", "question": "Can the programme be adapted to different project sectors?", "answer": "Yes. The programme is applied across two orientations: Project Controls Orientation (for engineering, manufacturing, construction, energy, defence, transport and infrastructure) and Management, Systems and Governance Orientation (for public sector, health, financial services, technology and general corporate programmes)."},
            {"id": "consultation", "question": "Can I speak with the College before choosing?", "answer": "Absolutely. We encourage every professional to speak with the College before choosing a route or module mix. A consultation helps you understand which direction fits your current role, your professional objectives and the capability your employer needs."},
        ]

    def pcp_master_sections(self):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Project Controls · Level 6",
                    "title": "Stop reporting project problems after they happen.",
                    "titleAccent": "Build the capability to see them earlier.",
                    "body": "Advanced professional development for people responsible for planning, scheduling, cost, Earned Value, risk, PMO and the performance of complex projects.",
                    "secondaryBody": "Choose the professional direction that reflects your responsibilities and build specialist Project Controls capability around real work.",
                    "tagline": "For working professionals · Employers · Project teams · PMO functions",
                    "primaryCta": {"label": "Explore the Routes", "url": "#routes"},
                    "secondaryCta": {"label": "Book a Programme Consultation", "url": "#consultation"},
                    "tertiaryLink": {"label": "View the Modules", "url": "#modules"},
                },
            },
            {
                "name": "Programme value", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Why This Programme",
                    "heading": "Project data is only valuable when it improves decisions",
                    "body": "The programme is designed to help professionals turn project information into reliable plans, credible schedules, controlled costs, early warnings, stronger governance and greater delivery confidence.",
                    "items": [
                        {"id": "information", "title": "Project Information", "body": "Schedules · Costs · Risks · Performance · Reports · Forecasts"},
                        {"id": "decisions", "title": "Professional Decisions", "body": "Priorities · Interventions · Governance · Executive confidence · Delivery control"},
                    ],
                },
            },
            {
                "name": "Who this is for", "type": SectionType.FEATURE_GRID, "anchor": "who-for",
                "content": {
                    "tag": "Professional Fit",
                    "heading": "Built for people already responsible for complex project performance",
                    "items": [
                        {"id": "controls", "title": "Project Controls", "includes": ["Project Controls Managers", "Project Controllers", "Planning Leads", "Planners", "Schedulers", "Cost Engineers", "Cost Controllers", "Performance Analysts"]},
                        {"id": "delivery", "title": "Project Delivery", "includes": ["Project Engineers", "Project Managers", "Programme Managers", "Delivery Leads"]},
                        {"id": "risk", "title": "Risk & Assurance", "includes": ["Risk Professionals", "Assurance Professionals", "Change Professionals"]},
                        {"id": "pmo", "title": "PMO & Governance", "includes": ["Heads of Project Controls", "PMO Leaders", "Portfolio Governance Professionals", "Senior Planning and Scheduling Leads"]},
                    ],
                },
            },
            {
                "name": "Capability map", "type": SectionType.FEATURE_GRID, "anchor": "capability",
                "content": {
                    "tag": "What You Develop",
                    "heading": "Build senior Project Controls capability",
                    "items": [
                        {"id": "plan", "title": "Plan", "body": "Create more reliable project plans."},
                        {"id": "schedule", "title": "Schedule", "body": "Understand dependencies, critical paths and delivery confidence."},
                        {"id": "measure", "title": "Measure", "body": "Interpret cost and Earned Value performance."},
                        {"id": "forecast", "title": "Forecast", "body": "Identify trends and emerging performance issues."},
                        {"id": "risk", "title": "Manage Risk", "body": "Turn risk information into proactive decisions."},
                        {"id": "control", "title": "Control", "body": "Strengthen baseline, change and Project Controls systems."},
                        {"id": "govern", "title": "Govern", "body": "Improve PMO, assurance and decision support."},
                        {"id": "communicate", "title": "Communicate", "body": "Turn complex project information into clear executive reporting."},
                    ],
                },
            },
            {
                "name": "Choose your route", "type": SectionType.CARD_GRID, "anchor": "routes", "variant": "programme",
                "content": {
                    "tag": "Professional Routes",
                    "heading": "One Level 6 programme. Three professional directions.",
                    "body": "Choose the professional direction that best reflects the work you do today and the responsibility you want to build towards.",
                    "items": [
                        {
                            "id": "operational", "badge": "Project Controls Delivery",
                            "title": "Control project performance with greater confidence",
                            "bestFor": "Professionals closest to planning, scheduling, Earned Value, reporting and operational Project Controls.",
                            "includes": ["Project Management Professional (PMP)", "AI in Project Controls", "Scheduling Professional (SP)", "Earned Value Management (EVM)", "Project Planning and Controls (PPC)"],
                            "cta": {"label": "Explore Operational Route", "url": "/operational-pcp"},
                        },
                        {
                            "id": "strategic", "badge": "Programmes · Portfolios · PMO", "highlighted": True, "ribbon": "Recommended",
                            "title": "Turn Project Controls insight into strategic influence",
                            "bestFor": "Senior Project Controls professionals, PMO leaders and professionals responsible for programmes, portfolios, governance and organisational decision support.",
                            "includes": ["Project Management Professional (PMP)", "AI in Project Controls", "Managing Successful Programmes (MSP)", "Management of Portfolios", "Project Management Office (PMO)"],
                            "cta": {"label": "Explore Strategic Route", "url": "/strategic-pcp"},
                        },
                        {
                            "id": "chartered", "badge": "Advanced Professional Recognition",
                            "title": "Build evidence towards Chartered-level professional practice",
                            "bestFor": "Experienced professionals whose priority is advanced PMO / Project Controls development, recognised technical knowledge and Chartered Project Professional progression.",
                            "includes": ["ChPP Readiness", "Professional Evidence", "Recognised Technical-Knowledge Pathway", "Advanced PMO Capability"],
                            "cta": {"label": "Explore Chartered Route", "url": "/chartered-pmo-pathway"},
                        },
                    ],
                    "comparison": {
                        "heading": "Which route reflects the work you do?",
                        "body": "Compare primary focus, best fit and outcome direction across the three professional routes.",
                        "rows": [
                            {"key": "focus", "label": "Primary Focus"},
                            {"key": "bestFit", "label": "Best For"},
                            {"key": "outcome", "label": "Outcome Direction"},
                        ],
                        "programmes": [
                            {"id": "operational", "title": "Operational", "focus": "Planning, scheduling, EVM, controls and delivery performance.", "bestFit": "Professionals working close to Project Controls delivery.", "outcome": "Control delivery."},
                            {"id": "strategic", "title": "Strategic", "focus": "Programme, portfolio, PMO, governance and organisational decision-making.", "bestFit": "Senior professionals influencing programmes, portfolios and governance.", "outcome": "Influence decisions."},
                            {"id": "chartered", "title": "Chartered", "focus": "Advanced PMO / Project Controls evidence and Chartered progression.", "bestFit": "Experienced professionals building advanced professional recognition.", "outcome": "Evidence advanced professional practice."},
                        ],
                        "cta": {"label": "Help Me Choose", "url": "#consultation"},
                    },
                },
            },
            {
                "name": "Specialist modules", "type": SectionType.CARD_GRID, "anchor": "modules",
                "content": {
                    "tag": "Specialist Modules",
                    "heading": "Build the capability your role actually requires",
                    "items": [
                        {"id": "pmp", "title": "Project Management Professional (PMP)", "meta": "Project Management", "body": "Comprehensive project management methodology and practice.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "ai", "title": "AI in Project Controls", "meta": "Emerging Technology", "body": "Applied AI tools for project controls, reporting and decision support.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "risk", "title": "Risk Management", "meta": "Risk & Assurance", "body": "Identify, assess and respond to project risk with structured techniques.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "sp", "title": "Scheduling Professional (SP)", "meta": "Planning & Scheduling", "body": "Build credible schedules and manage critical path delivery.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "evm", "title": "Earned Value Management (EVM)", "meta": "Performance Measurement", "body": "Measure cost and schedule performance with integrated metrics.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "ppc", "title": "Project Planning and Controls (PPC)", "meta": "Project Controls", "body": "Integrate planning, controls, change and performance systems.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "msp", "title": "Managing Successful Programmes (MSP)", "meta": "Programme Management", "body": "Coordinate and govern multiple projects as strategic programmes.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "portfolios", "title": "Management of Portfolios", "meta": "Portfolio Management", "body": "Prioritise and align projects with strategic organisational goals.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                        {"id": "pmo", "title": "Project Management Office (PMO)", "meta": "PMO & Governance", "body": "Design and operate governance, assurance and reporting functions.", "cta": {"label": "Explore Module", "url": "#consultation"}},
                    ],
                },
            },
            {
                "name": "Build your module mix", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern",
                "content": {
                    "tag": "Flexible Development",
                    "heading": "Your role should shape your development",
                    "body": "The programme architecture allows development to reflect professional responsibilities and employer priorities rather than forcing every professional through an identical module sequence.",
                    "items": [
                        {"id": "standard", "title": "Standard Professional Route", "body": "Follow Operational, Strategic or Chartered development through the structured professional pathway."},
                        {"id": "tailored", "title": "Tailored Module Mix", "body": "Combine approved modules around current responsibilities and capability needs where the College confirms the combination is appropriate. This is discussed with the College and is not a fourth Route."},
                    ],
                },
            },
            {
                "name": "Workplace output", "type": SectionType.RICH_TEXT,
                "content": {
                    "heading": "Professional outputs that strengthen real project performance",
                    "body": (
                        "Every output in the programme is tied directly to the responsibilities that working professionals, "
                        "project managers, PMO leaders and controls managers actually manage day-to-day. This is not theoretical "
                        "study. It is applied, documented and validated in a working environment.\n\n"
                        "• Plan and schedule deliverables.\n"
                        "• Maintain a project cost baseline.\n"
                        "• Manage and control change processes.\n"
                        "• Manage risk and maintain risk registers.\n"
                        "• Produce and present structured progress reports.\n"
                        "• Use Earned Value metrics to assess cost and schedule performance.\n"
                        "• Establish governance and assurance structures.\n"
                        "• Create a standardised project office environment and structure.\n"
                        "• Develop and manage project data sources.\n"
                        "• Apply earned value performance indicators and analysis techniques.\n"
                        "• Apply stakeholder management and communications management techniques.\n"
                        "• Provide recommendations for quality and improvement.\n"
                        "• Take professional responsibility and evaluate own performance.\n"
                        "• Apply, and manage the application of, project methodology and governance techniques.\n"
                        "• Manage projects using tools, equipment and information systems.\n"
                        "• Manage and control project scope.\n"
                        "• Provide detailed financial reports and forecasts using data, information and project intelligence.\n"
                        "• Evaluate and analyse performance trends, information and data.\n"
                        "• Be aware of AI and its capability to support project planning and control."
                    ),
                },
            },
            {
                "name": "Learning experience", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Learning Experience",
                    "heading": "A structured professional development process designed for working professionals",
                    "items": [
                        {"id": "prepare", "title": "Stage 1 · Prepare", "body": "Orient yourself to the professional development, understand the programme expectations, and identify the areas of Project Controls where your workplace already supports development."},
                        {"id": "explore", "title": "Stage 2 · Explore", "body": "Work through structured professional knowledge — project management, planning and control, Earned Value, risk, governance, AI and project controls — developing a foundation of knowledge you can immediately apply."},
                        {"id": "apply", "title": "Stage 3 · Apply", "body": "Apply what you learn to your current project environment. Produce real plans, schedules, risk registers, cost reports, governance frameworks and performance reviews that strengthen live project delivery."},
                        {"id": "reflect", "title": "Stage 4 · Reflect", "body": "Review your progress with the College, identify what changed in your professional practice and build evidence of competence for professional recognition pathways."},
                    ],
                },
            },
            {
                "name": "Professional support", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Professional Support",
                    "heading": "Support that respects your time and your role",
                    "items": [
                        {"id": "tutor", "title": "One-to-One Professional Tutor", "body": "Every professional has a dedicated tutor who understands their role, responsibilities, and the progress they are working towards."},
                        {"id": "review", "title": "Workplace Application Review", "body": "Evidence is developed and validated in a working environment, not through separate exercises. The work you produce strengthens your project."},
                        {"id": "monthly", "title": "Monthly Progress Reviews", "body": "Regular check-ins keep development aligned with professional responsibilities, employer priorities and emerging project demands."},
                        {"id": "reflection", "title": "Structured Reflection Process", "body": "Regular reflection helps identify gaps, celebrate improvement and build the professional maturity senior roles demand."},
                    ],
                },
            },
            {
                "name": "Programme experts", "type": SectionType.CARD_GRID, "anchor": "experts",
                "content": {
                    "tag": "Programme Experts",
                    "heading": "Recognised specialists in project delivery, controls and governance",
                    "items": [
                        {"id": "wake", "title": "Steven Wake", "body": "Earned Value Management · Project Controls Standards"},
                        {"id": "jenner", "title": "Stephen Jenner", "body": "Portfolio Management · Benefits · Governance"},
                        {"id": "badewi", "title": "Dr Amgad Badewi", "body": "Project Controls · Professional Development · Project Management"},
                        {"id": "mead", "title": "Ray Mead", "body": "PMO · Governance · Transformation"},
                        {"id": "millington", "title": "Andrew Millington", "body": "Complex Programmes · Capability Development · Project Controls"},
                    ],
                },
            },
            {
                "name": "Coaching support", "type": SectionType.RICH_TEXT,
                "content": {
                    "heading": "Personal development that strengthens professional practice",
                    "body": (
                        "Coaching is integrated into the programme. It is not an add-on. It is part of the structured "
                        "professional development designed to help professionals grow the professional confidence and "
                        "competence that senior roles require.\n\n"
                        "• Building professional confidence in project controls conversations.\n"
                        "• Preparing for internal governance reviews, assurance reviews and stakeholder meetings.\n"
                        "• Structuring evidence and demonstrating professional competence.\n"
                        "• Navigating the relationship between operational practice and professional standards.\n"
                        "• Supporting decision-making under pressure."
                    ),
                },
            },
            {
                "name": "College experience", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "College Experience",
                    "heading": "Support structures that make development possible",
                    "items": [
                        {"id": "environment", "title": "Professional Development Delivered in a Working Environment", "body": "Development is built around your current professional responsibilities. Your projects become your learning environment."},
                        {"id": "tutor", "title": "Named Professional Tutor from the College", "body": "A dedicated tutor who understands your role, responsibilities and professional objectives."},
                        {"id": "coaching", "title": "Senior Leadership Coaching", "body": "Integrated coaching to help professionals grow the confidence and decision-making capability senior roles demand."},
                        {"id": "residential", "title": "High-Quality Residential and In-Person Support", "body": "Professional residential events, in-person workshops and dedicated support facilities designed for working professionals."},
                        {"id": "exams", "title": "Professional Exams and Memberships", "body": "Relevant professional body exams and membership arrangements included where applicable."},
                        {"id": "account", "title": "Full Employer Account Management", "body": "The College provides employers with a dedicated point of contact, programme updates and transparent progress reporting."},
                        {"id": "platform", "title": "24/7 Online Study Environment", "body": "Professionals have access to a dedicated online platform for continuous learning, resources and support."},
                        {"id": "recognition", "title": "Professional Recognition Support", "body": "Structured support for professional recognition pathways, with clear evidence requirements and professional guidance."},
                    ],
                },
            },
            {
                "name": "IPC scholarships", "type": SectionType.CARD_GRID,
                "content": {
                    "tag": "IPC Scholarships",
                    "heading": "Developing professionals may be eligible for IPC scholarship or bursary support",
                    "body": "The International Project Management Association (through IPC) provides scholarships and bursary support for eligible professionals, subject to availability and eligibility. The College coordinates this support and provides guidance, but does not guarantee approval, control or fund these awards.",
                    "items": [
                        {"id": "fifty", "title": "50%", "body": "Support available depending on the selected Project Controls module. Subject to IPC availability and eligibility.", "cta": {"label": "Explore IPC Membership and Scholarships", "url": "https://www.ipm-a.org/"}},
                        {"id": "seventy-five", "title": "75%", "body": "Support available depending on the selected Project Controls module. Subject to IPC availability and eligibility."},
                    ],
                },
            },
            {
                "name": "Professional recognition", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern",
                "content": {
                    "tag": "Professional Recognition",
                    "heading": "Professional relationships that matter for your career",
                    "body": "The College partners with globally recognised professional bodies to provide certification pathways, examination support and professional recognition opportunities. Recognition is not automatic and depends on meeting each body's own criteria, evidence requirements and assessment processes.",
                    "items": [
                        {"id": "pmi", "title": "Project Management Institute (PMI)", "meta": "Recognised Training Partner", "body": "Professional standards, certification and project management body of knowledge."},
                        {"id": "apmg", "title": "APMG International", "meta": "Accredited Training Organisation", "body": "Axelos best-practice frameworks and professional certification."},
                        {"id": "peoplecert", "title": "PeopleCert / AXELOS", "meta": "Accredited Examination Partner", "body": "Structured certification examinations for project and programme management."},
                        {"id": "apm", "title": "Association for Project Management (APM)", "meta": "Professional Relationship", "body": "Supporting professionals on the path to professional recognition through structured development and evidence."},
                        {"id": "ipc", "title": "International Project Management Association (IPC)", "meta": "Scholarship and Bursary Coordination", "body": "International scholarship and bursary support for eligible professionals in project management and project controls."},
                    ],
                },
            },
            {
                "name": "Sector application", "type": SectionType.CARD_GRID,
                "content": {
                    "tag": "Sector Application",
                    "heading": "Applied across the project environments professionals work in every day",
                    "items": [
                        {
                            "id": "controls-orientation", "title": "Project Controls Orientation",
                            "body": "For professionals working in technical, infrastructure and regulated project environments where project controls, planning, scheduling and performance management are central to delivery.",
                            "includes": ["Engineering and Manufacturing", "Construction and Urban Development", "Energy, Oil, Gas and Utilities", "Defence and Government", "Transport, Digital and Infrastructure"],
                        },
                        {
                            "id": "governance-orientation", "title": "Management, Systems and Governance Orientation",
                            "body": "For professionals managing programmes, portfolios and governance structures where PMO, decision support, assurance and organisational capability are the primary responsibility.",
                            "includes": ["Public Sector", "Health and Social Care", "Financial Services", "Technology and Data", "General Corporate Programmes"],
                        },
                    ],
                },
            },
            {
                "name": "For employers", "type": SectionType.FEATURE_GRID, "anchor": "employers",
                "content": {
                    "tag": "For Employers",
                    "heading": "Build the Project Controls capability your projects cannot afford to be without",
                    "body": "Employers who invest in structured Project Controls development see stronger project performance, better decision-making, more reliable delivery forecasts and reduced project failure.",
                    "items": [
                        {"id": "account", "title": "Account Managed Professional Development", "body": "Employers receive a dedicated account manager and structured programme management. Progress is reviewed, reported and managed professionally."},
                        {"id": "capability", "title": "Build Internal Capability Across Multiple Professionals", "body": "The programme can support several professionals simultaneously. The College coordinates delivery, scheduling and individual progress for each person."},
                        {"id": "flexibility", "title": "Module Flexibility Aligned to Employer Priorities", "body": "Module combinations can be discussed with the College to align with the capability your organisation needs, within the programme architecture."},
                        {"id": "evidence", "title": "Real Workplace Evidence and Project Improvements", "body": "Professionals produce evidence that improves live projects, delivers reporting improvements, strengthens controls and builds governance."},
                        {"id": "mobility", "title": "Professional Recognition and Internal Mobility", "body": "Professionals can develop credentials recognised across your organisation, supported by professional relationships and structured evidence."},
                        {"id": "partnership", "title": "HR and Professional Development Partnership", "body": "The College works with HR, development and professional teams to align the programme with internal frameworks, standards and career progression structures."},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Explore the programme before you commit",
                    "body": "Live information sessions, professional-recognition webinars and specialist masterclasses run throughout the year.",
                    "items": [
                        {"id": "info-session", "badge": "Programme Information Session", "title": "Introduction to Project Controls Professional Level 6", "body": "First Thursday of each month · College Admissions Team · Live Online · Zoom"},
                        {"id": "chpp-webinar", "badge": "Professional Recognition Webinar", "title": "APM ChPP Pathway and Professional Recognition Options", "body": "Bi-monthly · College Professional Recognition Advisers · Live Online · Zoom"},
                        {"id": "evm-masterclass", "badge": "Project Controls Masterclass", "title": "Earned Value Management and Performance Reporting", "body": "Quarterly · Steven Wake · In-Person / Online Hybrid · College of Project Controls, London"},
                        {"id": "employer-session", "badge": "Employer Capability Session", "title": "Building Project Controls Capability Across Teams", "body": "On request · College Employer Relations Team · Live Online / Bespoke · Virtual or On-Site"},
                    ],
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": "Project Controls Professional Level 6, clearly explained",
                    "items": self.pcp_master_faqs(),
                },
            },
            {
                "name": "Consultation", "type": SectionType.LEAD_FORM, "anchor": "consultation",
                "content": {
                    "tag": "Your Professional Direction",
                    "heading": "Build the Project Controls capability your responsibility demands",
                    "body": "Talk to the College about your role, current responsibilities and professional direction before choosing a Route or module mix.",
                    "enquiryTypes": ["Operational PCP", "Strategic PCP", "Chartered PCP", "Not sure yet"],
                    "buttonLabel": "Speak to an Adviser",
                },
            },
        ]

    def strategic_pcp_faqs(self):
        return [
            {"id": "who", "question": "Who is the Strategic PCP Route best suited to?", "answer": "This route is designed for PMO leads, project controls managers, governance leads, programme managers, senior planners, risk leads, portfolio analysts, and experienced professionals moving into strategic PMO, governance or project controls leadership roles."},
            {"id": "funded", "question": "Is this route fully funded?", "answer": "The Strategic PCP Route is fully funded where eligible. For qualifying employers and learners in England, the Department for Education funding band is up to £27,000 through the apprenticeship levy or co-investment model."},
            {"id": "eligible-meaning", "question": "What does “Fully Funded Where Eligible” mean?", "answer": "Eligibility depends on the learner's place of work, employment status, role relevance and prior qualifications. For levy-paying employers, 100% of the funding band is covered. For non-levy payers, the government contributes 95% and the employer contributes 5%."},
            {"id": "not-eligible", "question": "What if I am not eligible for apprenticeship funding?", "answer": "We offer a Commercial Route for self-funded professionals, self-employed learners and those who are not eligible for apprenticeship funding."},
            {"id": "chpp", "question": "Does this route guarantee APM ChPP?", "answer": "The route includes APM ChPP readiness support to help learners prepare evidence and build confidence. Chartered status is awarded by the APM based on independent assessment criteria."},
            {"id": "delivery", "question": "How is the programme delivered?", "answer": "Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks."},
        ]

    def strategic_pcp_sections(self):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Fully Funded Where Eligible",
                    "title": "Turn Project Controls Data Into Better Strategic Decisions",
                    "body": "A Strategic Project Controls Professional route for PMO leaders, governance leads and experienced project professionals who need to improve reporting confidence, assurance and senior decision-making.",
                    "secondaryBody": "Develop the capability to connect planning, cost, risk, reporting, governance and PMO insight into clearer decisions across complex programmes.",
                    "tagline": "Fully Funded Where Eligible · Up to £27,000 Government Funding Band · APM ChPP Readiness Support · Workplace Evidence Support",
                    "primaryCta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                    "secondaryCta": {"label": "Check Funding Eligibility", "url": "#consultation"},
                    "tertiaryLink": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                },
            },
            {
                "name": "Gold ticker", "type": SectionType.LOGO_MARQUEE,
                "content": {
                    "label": "Strategic PCP Route",
                    "items": [
                        {"id": "funded", "name": "Fully Funded Where Eligible"},
                        {"id": "band", "name": "Up to £27,000 Government Funding Band"},
                        {"id": "capability", "name": "Strategic PMO and Governance Capability"},
                        {"id": "chpp", "name": "APM ChPP Readiness Support"},
                        {"id": "leaders", "name": "Build Internal Project Controls Leaders"},
                        {"id": "consult", "name": "Book a 15-Minute Route-Fit Consultation"},
                    ],
                },
            },
            {
                "name": "Strategic capability", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Strategic Capability",
                    "heading": "Develop Strategic Project Controls Capability That Grows With Your Responsibility",
                    "body": "This route is designed to help professionals move from producing reports to shaping decisions, improving governance and strengthening PMO confidence.",
                    "items": [
                        {"id": "reporting", "title": "Executive Reporting", "body": "Turn controls information into reports senior leaders can actually use to make informed decisions."},
                        {"id": "governance", "title": "Governance Confidence", "body": "Support clearer escalation, assurance and decision-making routines across your programme."},
                        {"id": "maturity", "title": "PMO Maturity", "body": "Strengthen portfolio visibility, reporting standards and control discipline within your organisation."},
                    ],
                },
            },
            {
                "name": "Why this route", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Why This Route",
                    "heading": "Your PMO May Have Reports. But Does It Have Control?",
                    "body": "Reporting activity is not the same as decision confidence. This route helps professionals close the gap between producing updates and shaping outcomes.",
                    "items": [
                        {"id": "reporting-volume", "title": "Too Much Reporting", "body": "Reports are created, but they do not always explain what decision is needed."},
                        {"id": "delayed", "title": "Delayed Decisions", "body": "Senior leaders receive updates, but confidence in next steps remains unclear."},
                        {"id": "late-risk", "title": "Risk Signals Too Late", "body": "Cost, schedule and risk warnings are not always connected early enough."},
                        {"id": "no-insight", "title": "Governance Without Insight", "body": "Meetings focus on updates instead of meaningful control and challenge."},
                    ],
                },
            },
            {
                "name": "The strategic process", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern",
                "content": {
                    "tag": "The Strategic Process",
                    "heading": "From Project Data to Board-Level Confidence",
                    "body": "A simple strategic pathway for turning project controls information into better decisions.",
                    "items": [
                        {"id": "understand", "title": "Understand the Position", "meta": "Step 01", "body": "Connect cost, schedule, risk, change and performance information into one clear picture of where the programme stands."},
                        {"id": "explain", "title": "Explain the Variance", "meta": "Step 02", "body": "Interpret why performance is changing, what the trends mean and what it signals for programme outcomes."},
                        {"id": "support", "title": "Support the Decision", "meta": "Step 03", "body": "Translate insight into clear recommendations for governance and senior stakeholders with options and confidence levels."},
                    ],
                },
            },
            {
                "name": "Impact numbers", "type": SectionType.STATS,
                "content": {
                    "items": [
                        {"id": "funding-band", "value": "£27,000", "label": "Government funding band where eligible"},
                        {"id": "areas", "value": "3", "label": "Strategic capability areas: PMO, Governance and Decision Support"},
                        {"id": "consultation", "value": "1", "label": "Route-fit consultation to confirm eligibility and best pathway"},
                    ],
                },
            },
            {
                "name": "Choose your access route", "type": SectionType.CARD_GRID, "variant": "programme",
                "content": {
                    "tag": "Access Routes",
                    "heading": "Choose the Right Access Route",
                    "items": [
                        {
                            "id": "apprenticeship", "badge": "Fully Funded Where Eligible", "highlighted": True, "ribbon": "Fully Funded Where Eligible",
                            "title": "Apprenticeship Route",
                            "body": "For eligible employers and learners in England. Suitable for employees in roles connected to PMO, governance, project controls, reporting, risk, planning, cost or programme delivery.",
                            "cta": {"label": "Check Apprenticeship Eligibility", "url": "#consultation"},
                        },
                        {
                            "id": "commercial", "badge": "For Non-Eligible Learners",
                            "title": "Commercial Route",
                            "body": "For self-funded professionals, self-employed learners or applicants who are not eligible for apprenticeship funding.",
                            "cta": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                        },
                    ],
                },
            },
            {
                "name": "Who this route is for", "type": SectionType.CARD_GRID, "anchor": "who-for",
                "content": {
                    "heading": "Who Should Choose the Strategic PCP Route?",
                    "items": [
                        {
                            "id": "professionals", "title": "For Professionals", "meta": "Best suited to",
                            "includes": ["PMO Leads", "Project Controls Managers", "Governance Leads", "Programme Managers", "Senior Planners", "Risk Leads", "Portfolio Analysts", "Future Heads of Project Controls"],
                        },
                        {
                            "id": "employers", "title": "For Employers", "meta": "Best suited to organisations that need",
                            "includes": ["Stronger PMO maturity", "Better governance reporting", "More reliable project assurance", "Improved cost, schedule and risk challenge", "Internal project controls leadership", "Structured progression for high-potential employees"],
                        },
                    ],
                },
            },
            {
                "name": "What you develop", "type": SectionType.FEATURE_GRID, "anchor": "develop",
                "content": {
                    "heading": "Strategic Capabilities Learners Develop",
                    "body": "Each capability area builds directly on workplace practice and is assessed through real evidence.",
                    "items": [
                        {"id": "reporting", "title": "Executive Reporting", "body": "Present options, forecasts and recommendations rather than just historical data."},
                        {"id": "governance", "title": "Governance Confidence", "body": "Support clearer escalation, assurance and decision routines across the programme."},
                        {"id": "maturity", "title": "PMO Maturity", "body": "Strengthen portfolio visibility, standards and control discipline."},
                        {"id": "risk", "title": "Risk Challenge", "body": "Implement proactive risk frameworks that surface issues before they escalate."},
                        {"id": "visibility", "title": "Portfolio Visibility", "body": "Create consistent controls standards that improve confidence across programmes."},
                        {"id": "decisions", "title": "Decision Support", "body": "Translate insight into clear recommendations for senior stakeholders."},
                    ],
                },
            },
            {
                "name": "Strategic project controls in practice", "type": SectionType.CARD_GRID,
                "content": {
                    "heading": "Strategic Project Controls in Practice",
                    "items": [
                        {"id": "energy", "title": "Project Controls Professional", "meta": "Energy Sector", "body": "The programme helped me move from producing reports to explaining what the data meant for senior decision-making."},
                        {"id": "infrastructure", "title": "PMO Director", "meta": "Infrastructure Programme", "body": "Kent Business College helped us create a clearer development route for PMO and project controls professionals."},
                        {"id": "public-sector", "title": "Level 6 Learner", "meta": "Public Sector", "body": "The coaching helped me connect governance, risk and reporting to my actual role."},
                        {"id": "case-study", "title": "Developing PMO and Governance Capability Across a Complex Programme", "body": "How an infrastructure programme built internal controls leadership using the Strategic PCP Route.", "cta": {"label": "Read Employer Case Study", "url": "/testimonials"}},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Meet the people behind the programmes",
                    "body": "Join specialist Masterclasses, professional events, webinars and information sessions focused on Project Controls, project delivery and professional development.",
                    "items": [
                        {"id": "masterclass", "badge": "Project Controls Masterclass", "title": "Explore specialist Project Controls topics", "body": "Join practitioners to explore specialist Project Controls topics, masterclasses and professional discussions. Format: online.", "cta": {"label": "View Upcoming Events", "url": "#consultation"}},
                        {"id": "info-session", "badge": "Information Session", "title": "Speak with the College", "body": "Join professional webinars and information sessions to speak with the College about programmes, specialist modules and employer development. Format: online.", "cta": {"label": "Book an Information Session", "url": "#consultation"}},
                    ],
                },
            },
            {
                "name": "Final call to action", "type": SectionType.CTA,
                "content": {
                    "heading": "Ready to Build Strategic Project Controls Confidence?",
                    "body": "Book a one-to-one consultation and we will help you understand the route, funding position, eligibility and next steps. Funding, support packages and progression support are subject to eligibility, availability and applicable rules. APM ChPP pathway support helps learners prepare for professional progression but does not guarantee Chartered status.",
                    "cta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                },
            },
            {
                "name": "Consultation and eligibility", "type": SectionType.LEAD_FORM, "anchor": "consultation",
                "content": {
                    "tag": "Start a Conversation",
                    "heading": "Check your funding eligibility or book a route-fit consultation",
                    "body": "Share your role, employer situation and development goal. An adviser will confirm the most relevant route and funding position.",
                    "enquiryTypes": ["Funding eligibility check", "Route-fit consultation", "Employer cohort", "General enquiry"],
                    "buttonLabel": "Send my enquiry",
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": "Strategic Project Controls, clearly explained",
                    "items": self.strategic_pcp_faqs(),
                },
            },
        ]

    def operational_pcp_faqs(self):
        return [
            {"id": "who", "question": "Who is the Operational PCP route for?", "answer": "This route is designed for planners, schedulers, cost engineers, risk analysts, PMO analysts, project controllers, assistant project managers and project delivery teams who work directly with schedules, cost, risk, change and performance reporting."},
            {"id": "vs-strategic", "question": "How does this differ from the Strategic route?", "answer": "The Operational route focuses on hands-on project controls skills — planning, scheduling, cost control, risk management and reporting. The Strategic route focuses on governance, assurance and executive decision-support."},
            {"id": "sectors", "question": "Which sectors benefit most?", "answer": "Construction, building, urban development, engineering, manufacturing, aerospace, medicals, pharmaceuticals, energy, oil and gas, utilities and infrastructure — any sector with complex project delivery."},
            {"id": "add-strategic", "question": "Can I add Strategic modules later?", "answer": "Yes. Many professionals start with the Operational route and later add Strategic modules through our Strategic + Operational combined pathway, or progress to the OTHM Diploma Level 7."},
            {"id": "funded", "question": "Is this route fully funded?", "answer": "The Operational PCP Route is fully funded where eligible. For qualifying employers and learners in England, the Department for Education funding band is up to £27,000."},
            {"id": "eligible-meaning", "question": "What does “Fully Funded Where Eligible” mean?", "answer": "Eligibility depends on the learner's place of work, employment status, role relevance and prior qualifications. Levy-paying employers get 100% coverage. Non-levy payers receive 95% government contribution."},
            {"id": "delivery", "question": "How is the programme delivered?", "answer": "Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks."},
            {"id": "cohorts", "question": "Can employers enrol multiple learners?", "answer": "Yes. Many employers enrol cohorts across planning, cost, risk and PMO functions. Group delivery can be arranged for organisations building internal capability at scale."},
        ]

    def operational_pcp_sections(self):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Fully Funded Where Eligible",
                    "title": "Stop Firefighting. Start Controlling.",
                    "body": "A fully funded Level 6 pathway where eligible, designed for employees who work with schedules, cost, risk, change, performance reporting and workplace evidence.",
                    "secondaryBody": "Projects rarely fail because no one is working hard. They fail because the right information arrives too late. Build the operational capability to see problems earlier, control them faster and deliver with confidence.",
                    "tagline": "Fully Funded Where Eligible · Up to £27,000 Government Funding Band · APM ChPP Readiness Support · Workplace Evidence Support",
                    "primaryCta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                    "secondaryCta": {"label": "Check Funding Eligibility", "url": "#consultation"},
                    "tertiaryLink": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                },
            },
            {
                "name": "Gold ticker", "type": SectionType.LOGO_MARQUEE,
                "content": {
                    "label": "Operational PCP Route",
                    "items": [
                        {"id": "funded", "name": "Fully Funded Where Eligible"},
                        {"id": "band", "name": "Up to £27,000 Government Funding Band"},
                        {"id": "capability", "name": "Planning, Cost, Risk & Reporting Capability"},
                        {"id": "chpp", "name": "APM ChPP Readiness Support"},
                        {"id": "teams", "name": "Build Internal Project Controls Teams"},
                        {"id": "consult", "name": "Book a 15-Minute Route-Fit Consultation"},
                    ],
                },
            },
            {
                "name": "Operational capability", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Operational Capability",
                    "heading": "Develop Hands-On Project Controls Capability That Improves Delivery",
                    "body": "This route builds practical skills that directly reduce delay, cost drift and delivery uncertainty — from schedule control to risk management and evidence-based reporting.",
                    "items": [
                        {"id": "planning", "title": "Planning Discipline", "body": "Build structured, defendable schedules with critical path analysis and realistic baselines."},
                        {"id": "cost", "title": "Cost & Schedule Visibility", "body": "Track earned value, forecast at completion and identify cost drift before it becomes overrun."},
                        {"id": "risk", "title": "Risk & Change Control", "body": "Implement structured risk management and change control processes that protect project outcomes."},
                    ],
                },
            },
            {
                "name": "Why this route", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Why This Route",
                    "heading": "Your Teams Work Hard. But Does Your Controls Function Keep Up?",
                    "items": [
                        {"id": "schedule-delays", "title": "Schedule Delays and Missed Milestones", "body": "Critical path issues surface too late to take corrective action before the delay impacts delivery."},
                        {"id": "cost-overruns", "title": "Cost Overruns and Budget Pressure", "body": "Cost reports arrive after spending decisions have been made — too late to prevent overrun."},
                        {"id": "subcontractor", "title": "Complex Subcontractor Coordination", "body": "Multiple packages and interfaces create gaps in visibility that nobody owns or tracks."},
                        {"id": "nec-change", "title": "NEC Change Control Complexity", "body": "Change is treated as paperwork rather than a commercial discipline that protects position."},
                        {"id": "reporting", "title": "Unreliable Progress Reporting", "body": "Stakeholders receive status updates that describe what happened, not what is about to happen."},
                        {"id": "baseline", "title": "Weak Baseline Management", "body": "Baselines drift without structured change control, undermining forecast confidence."},
                    ],
                },
            },
            {
                "name": "The operational process", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern",
                "content": {
                    "heading": "From Project Data to Delivery Confidence",
                    "body": "A simple operational pathway for turning controls information into better delivery performance.",
                    "items": [
                        {"id": "collect", "title": "Collect the Data", "meta": "Step 01", "body": "Gather schedule, cost, risk, change and performance information into consistent, evidence-based records."},
                        {"id": "analyse", "title": "Analyse the Variance", "meta": "Step 02", "body": "Compare actual against baseline, identify trends and surface issues before they become delivery problems."},
                        {"id": "act", "title": "Act on the Insight", "meta": "Step 03", "body": "Use controls data to inform decisions, adjust forecasts and keep the programme on track."},
                    ],
                },
            },
            {
                "name": "Operational value", "type": SectionType.STATS,
                "content": {
                    "items": [
                        {"id": "funding-band", "value": "£27,000", "label": "Government funding band where eligible"},
                        {"id": "areas", "value": "3", "label": "Core areas: Planning, Cost and Risk Control"},
                        {"id": "consultation", "value": "1", "label": "Route-fit consultation to confirm the best pathway"},
                    ],
                },
            },
            {
                "name": "Choose your access route", "type": SectionType.CARD_GRID, "variant": "programme",
                "content": {
                    "heading": "Choose the Right Access Route",
                    "items": [
                        {
                            "id": "apprenticeship", "badge": "Fully Funded Where Eligible", "highlighted": True, "ribbon": "Fully Funded Where Eligible",
                            "title": "Apprenticeship Route",
                            "body": "For eligible employers and learners in England. Suitable for employees in roles connected to planning, scheduling, cost engineering, risk, reporting or project delivery.",
                            "cta": {"label": "Check Apprenticeship Eligibility", "url": "#consultation"},
                        },
                        {
                            "id": "commercial", "badge": "For Non-Eligible Learners",
                            "title": "Commercial Route",
                            "body": "For self-funded professionals, self-employed learners or applicants who are not eligible for apprenticeship funding.",
                            "cta": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                        },
                    ],
                },
            },
            {
                "name": "Who this route is for", "type": SectionType.CARD_GRID, "anchor": "who-for",
                "content": {
                    "heading": "Who Should Choose the Operational PCP Route?",
                    "items": [
                        {
                            "id": "professionals", "title": "For Professionals", "meta": "Best suited to",
                            "includes": ["Planners and Schedulers", "Cost Engineers", "Risk Analysts", "PMO Analysts", "Project Controllers", "Assistant Project Managers", "Delivery Team Members", "Site-Based Project Support"],
                        },
                        {
                            "id": "employers", "title": "For Employers", "meta": "Best suited to organisations that need",
                            "includes": ["Stronger planning and scheduling discipline", "Better cost and schedule visibility", "Improved risk and change control", "More reliable progress reporting", "Internal project controls capability", "Structured progression for delivery teams"],
                        },
                    ],
                },
            },
            {
                "name": "What you develop", "type": SectionType.FEATURE_GRID, "anchor": "develop",
                "content": {
                    "heading": "Operational Capabilities Learners Develop",
                    "body": "Each capability area builds directly on workplace practice and is assessed through real evidence.",
                    "items": [
                        {"id": "planning", "title": "Planning & Scheduling", "body": "Build structured, logic-linked schedules with realistic baselines and critical path analysis."},
                        {"id": "cost", "title": "Cost Control", "body": "Track earned value, variance and forecast at completion to prevent cost drift."},
                        {"id": "risk", "title": "Risk & Change Management", "body": "Implement proactive risk frameworks and structured change control processes."},
                        {"id": "reporting", "title": "Progress Reporting", "body": "Deliver evidence-based progress data that gives stakeholders real confidence."},
                        {"id": "baseline", "title": "Baseline Discipline", "body": "Maintain schedule and cost baseline integrity through structured change control."},
                        {"id": "confidence", "title": "Delivery Confidence", "body": "Reduce the gap between planned and actual with stronger controls routines."},
                    ],
                },
            },
            {
                "name": "Operational project controls in practice", "type": SectionType.CARD_GRID,
                "content": {
                    "heading": "Operational Project Controls in Practice",
                    "items": [
                        {"id": "sharma", "title": "Priya Sharma", "meta": "Senior Planner — Infrastructure", "body": "The programme helped me move from reactive firefighting to proactive schedule control. Our progress reports are now evidence-based."},
                        {"id": "morrison", "title": "James Morrison", "meta": "Cost Engineer — Construction", "body": "Before the Operational PCP, our cost reports were always too late. Now we track variance in real time and act before overrun."},
                        {"id": "davies", "title": "Tom Davies", "meta": "Project Controller — Commercial Construction", "body": "The risk and change control modules changed how our team manages NEC contracts. Proper commercial discipline, not just paperwork."},
                        {"id": "case-study", "title": "Building Controls Capability Across a Construction Programme", "body": "How a major infrastructure employer used the Operational PCP Route to strengthen planning, cost and reporting discipline.", "cta": {"label": "Read Employer Case Study", "url": "/testimonials"}},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Meet the people behind the programmes",
                    "body": "Join specialist Masterclasses, professional events, webinars and information sessions focused on Project Controls, project delivery and professional development.",
                    "items": [
                        {"id": "masterclass", "badge": "Project Controls Masterclass", "title": "Explore specialist Project Controls topics", "body": "Join practitioners to explore specialist Project Controls topics, masterclasses and professional discussions. Format: online.", "cta": {"label": "View Upcoming Events", "url": "#consultation"}},
                        {"id": "info-session", "badge": "Information Session", "title": "Speak with the College", "body": "Join professional webinars and information sessions to speak with the College about programmes, specialist modules and employer development. Format: online.", "cta": {"label": "Book an Information Session", "url": "#consultation"}},
                    ],
                },
            },
            {
                "name": "Final call to action", "type": SectionType.CTA,
                "content": {
                    "heading": "Ready to Build Stronger Operational Project Controls?",
                    "body": "Book a one-to-one consultation and we will help you understand the route, funding position, eligibility and next steps. Funding, support packages and progression support are subject to eligibility, availability and applicable rules. APM ChPP pathway support helps learners prepare for professional progression but does not guarantee Chartered status.",
                    "cta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                },
            },
            {
                "name": "Consultation and eligibility", "type": SectionType.LEAD_FORM, "anchor": "consultation",
                "content": {
                    "tag": "Start a Conversation",
                    "heading": "Check your operational route eligibility or book a consultation",
                    "body": "Tell us about your role, organisation and funding position. A member of our team will guide you to the most suitable route.",
                    "enquiryTypes": ["Funding eligibility check", "Route-fit consultation", "Employer cohort", "General enquiry"],
                    "buttonLabel": "Book my consultation",
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": "Operational PCP Route FAQs",
                    "items": self.operational_pcp_faqs(),
                },
            },
        ]

    def strategic_operational_pcp_faqs(self):
        return [
            {"id": "what", "question": "What is the Strategic + Operational combined route?", "answer": "This premium pathway combines the hands-on project controls skills of the Operational route with the governance, assurance and leadership capability of the Strategic route. It also includes OTHM Level 7 Diploma progression for professionals moving towards senior project, PMO and portfolio leadership."},
            {"id": "who", "question": "Who is this route designed for?", "answer": "Experienced project controls professionals, senior PMO professionals, project managers moving into controls leadership, and employers building future project controls leaders who need both technical and strategic capability."},
            {"id": "length", "question": "How long does the combined route take?", "answer": "Typically 2 years, with the Strategic and Operational modules running in parallel. The OTHM Level 7 Diploma progression continues beyond the apprenticeship, supported by Saturday workshops focused on Strategy and Leadership."},
            {"id": "recognition", "question": "What professional recognition does it lead to?", "answer": "APM ChPP readiness support, PMO leadership development, OTHM Level 7 Diploma in Project Management, and professional membership support. This is the most comprehensive professional development pathway we offer."},
            {"id": "employer-support", "question": "Can my employer support this route?", "answer": "Yes. Many employers prefer this combined route because it builds both immediate project controls capability and long-term leadership potential. Fully funded options are available where eligible."},
            {"id": "funded", "question": "Is this route fully funded?", "answer": "The combined route is fully funded where eligible. For qualifying employers and learners in England, the Department for Education funding band is up to £27,000."},
            {"id": "eligible-meaning", "question": "What does “Fully Funded Where Eligible” mean?", "answer": "Eligibility depends on the learner's place of work, employment status, role relevance and prior qualifications. Levy-paying employers get 100% coverage. Non-levy payers receive 95% government contribution."},
            {"id": "book", "question": "How do I book a consultation?", "answer": "Complete the consultation form on this page or email us directly. A member of our team will arrange a one-to-one discussion to understand your role, organisation and funding position."},
        ]

    def strategic_operational_pcp_sections(self):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Fully Funded Where Eligible",
                    "title": "Manage the Detail. Explain the Variance. Influence the Decision.",
                    "body": "A premium pathway combining Level 6 project controls capability with strategic development and OTHM Level 7 progression for professionals moving towards senior project, PMO and portfolio leadership.",
                    "secondaryBody": "Most development programmes make you choose between technical and strategic. The combined pathway builds both — giving you the technical depth to manage the controls and the strategic capability to influence the decisions.",
                    "tagline": "Fully Funded Where Eligible · Up to £27,000 Government Funding Band · OTHM Level 7 Diploma Progression · Workplace Evidence Support",
                    "primaryCta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                    "secondaryCta": {"label": "Check Funding Eligibility", "url": "#consultation"},
                    "tertiaryLink": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                },
            },
            {
                "name": "Gold ticker", "type": SectionType.LOGO_MARQUEE,
                "content": {
                    "label": "Strategic + Operational PCP",
                    "items": [
                        {"id": "funded", "name": "Fully Funded Where Eligible"},
                        {"id": "band", "name": "Up to £27,000 Government Funding Band"},
                        {"id": "capability", "name": "Combined Technical + Strategic Capability"},
                        {"id": "othm", "name": "OTHM Level 7 Diploma Progression"},
                        {"id": "leaders", "name": "Build Future Project Controls Leaders"},
                        {"id": "consult", "name": "Book a 15-Minute Route-Fit Consultation"},
                    ],
                },
            },
            {
                "name": "Combined capability", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Combined Capability",
                    "heading": "Develop Technical Depth and Strategic Leadership Together",
                    "body": "This route is designed for experienced professionals who need both hands-on controls capability and the strategic confidence to influence programme decisions.",
                    "items": [
                        {"id": "technical", "title": "Technical Mastery", "body": "Build deep competence in planning, scheduling, cost engineering, risk management and performance reporting."},
                        {"id": "strategic", "title": "Strategic Influence", "body": "Develop governance, assurance, executive reporting and decision-support capability that shapes programme outcomes."},
                        {"id": "othm", "title": "OTHM Level 7 Progression", "body": "Progress towards the OTHM Diploma Level 7 in Project Management with Strategy and Leadership focus."},
                    ],
                },
            },
            {
                "name": "Why this route", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Why This Route",
                    "heading": "Technical Depth Without Strategic Voice. Or Strategic Awareness Without Technical Credibility.",
                    "items": [
                        {"id": "no-influence", "title": "Technical Depth Without Strategic Influence", "body": "You can build the schedule, track the cost and manage the risk — but you struggle to turn that data into decisions that shape programme outcomes."},
                        {"id": "no-credibility", "title": "Strategic Awareness Without Technical Credibility", "body": "You understand governance and executive reporting — but when challenged on the numbers, you lack the technical depth to defend your position."},
                        {"id": "ceiling", "title": "Career Ceiling Without Leadership Pathway", "body": "Promoted for technical excellence, but stuck at the ceiling because you have not built the strategic and leadership capability senior roles demand."},
                        {"id": "half-capability", "title": "Employers Need Both, But Training Only Gives One", "body": "Most development programmes force you to choose between technical and strategic — leaving you with half the capability your role requires."},
                    ],
                },
            },
            {
                "name": "The combined process", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern",
                "content": {
                    "heading": "From Project Controls to Programme Leadership",
                    "body": "A premium pathway for professionals who need both technical credibility and strategic influence.",
                    "items": [
                        {"id": "master", "title": "Master the Controls", "meta": "Step 01", "body": "Build deep technical competence in planning, cost, risk, change and performance reporting across complex programmes."},
                        {"id": "voice", "title": "Develop Strategic Voice", "meta": "Step 02", "body": "Learn to interpret controls data, explain variance and translate insight into options senior stakeholders can act on."},
                        {"id": "leadership", "title": "Progress to Leadership", "meta": "Step 03", "body": "Apply combined capability through OTHM Level 7 progression, building the strategic leadership that opens senior roles."},
                    ],
                },
            },
            {
                "name": "Combined value", "type": SectionType.STATS,
                "content": {
                    "items": [
                        {"id": "funding-band", "value": "£27,000", "label": "Government funding band where eligible"},
                        {"id": "tracks", "value": "2", "label": "Combined capability tracks: Operational + Strategic"},
                        {"id": "othm", "value": "7", "label": "OTHM Level 7 Diploma progression included"},
                    ],
                },
            },
            {
                "name": "Choose your access route", "type": SectionType.CARD_GRID, "variant": "programme",
                "content": {
                    "heading": "Choose the Right Access Route",
                    "items": [
                        {
                            "id": "apprenticeship", "badge": "Fully Funded Where Eligible", "highlighted": True, "ribbon": "Fully Funded Where Eligible",
                            "title": "Apprenticeship Route",
                            "body": "For eligible employers and learners in England. Suitable for experienced professionals in roles connected to PMO, governance, project controls, reporting, risk, planning, cost or programme delivery.",
                            "cta": {"label": "Check Apprenticeship Eligibility", "url": "#consultation"},
                        },
                        {
                            "id": "commercial", "badge": "For Non-Eligible Learners",
                            "title": "Commercial Route",
                            "body": "For self-funded professionals, self-employed learners or applicants who are not eligible for apprenticeship funding.",
                            "cta": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                        },
                    ],
                },
            },
            {
                "name": "Who this route is for", "type": SectionType.CARD_GRID, "anchor": "who-for",
                "content": {
                    "heading": "Who Should Choose the Strategic + Operational Route?",
                    "items": [
                        {
                            "id": "professionals", "title": "For Professionals", "meta": "Best suited to",
                            "includes": ["Experienced Project Controls Professionals", "Senior PMO Professionals", "Project Managers Moving Into Controls Leadership", "Programme Controllers Seeking Career Progression", "Future Heads of Project Controls", "Portfolio Analysts", "Risk and Planning Leads", "Strategic Planners"],
                        },
                        {
                            "id": "employers", "title": "For Employers", "meta": "Best suited to organisations that need",
                            "includes": ["Technical depth and strategic leadership combined", "Internal project controls leaders with board confidence", "OTHM Level 7 progression for high-potential staff", "Stronger PMO maturity and governance", "Improved cost, schedule and risk challenge", "Structured progression for future programme leaders"],
                        },
                    ],
                },
            },
            {
                "name": "What you develop", "type": SectionType.FEATURE_GRID, "anchor": "develop",
                "content": {
                    "heading": "Combined Capabilities Learners Develop",
                    "body": "Each capability area builds directly on workplace practice and is assessed through real evidence.",
                    "items": [
                        {"id": "technical", "title": "Technical Mastery", "body": "Deep competence in planning, scheduling, cost engineering, risk and performance reporting."},
                        {"id": "leadership", "title": "Strategic Leadership", "body": "Governance, assurance, executive reporting and decision-support capability."},
                        {"id": "othm", "title": "OTHM Level 7 Progression", "body": "Strategy and leadership development towards OTHM Diploma Level 7."},
                        {"id": "coaching", "title": "One-to-One Coaching", "body": "Personalised support from experienced practitioners throughout your journey."},
                        {"id": "masterclass", "title": "London Master Class Events", "body": "In-person professional development with industry peers and expert practitioners."},
                        {"id": "chpp", "title": "APM ChPP Readiness", "body": "Structured evidence preparation and professional support towards Chartered status."},
                    ],
                },
            },
            {
                "name": "Combined route in practice", "type": SectionType.CARD_GRID,
                "content": {
                    "heading": "Combined Route in Practice",
                    "items": [
                        {"id": "chen", "title": "Andrew Chen", "meta": "Project Controls Manager — Energy", "body": "The combined pathway gave me the technical depth to manage our project controls function and the strategic confidence to present to the programme board."},
                        {"id": "graduate", "title": "Level 6 Learner", "meta": "Combined Pathway Graduate", "body": "I no longer have to choose between technical credibility and strategic voice. This route genuinely built both."},
                        {"id": "director", "title": "Employer — Infrastructure", "meta": "Programme Director", "body": "Kent Business College understood that we needed professionals who could operate at both levels. The combined route delivered exactly that."},
                        {"id": "case-study", "title": "Building Complete Project Controls Leaders for a Major Programme", "body": "How an energy employer combined technical and strategic development for their controls team.", "cta": {"label": "Read Employer Case Study", "url": "/testimonials"}},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Meet the people behind the programmes",
                    "body": "Join specialist Masterclasses, professional events, webinars and information sessions focused on Project Controls, project delivery and professional development.",
                    "items": [
                        {"id": "masterclass", "badge": "Project Controls Masterclass", "title": "Explore specialist Project Controls topics", "body": "Join practitioners to explore specialist Project Controls topics, masterclasses and professional discussions. Format: online.", "cta": {"label": "View Upcoming Events", "url": "#consultation"}},
                        {"id": "info-session", "badge": "Information Session", "title": "Speak with the College", "body": "Join professional webinars and information sessions to speak with the College about programmes, specialist modules and employer development. Format: online.", "cta": {"label": "Book an Information Session", "url": "#consultation"}},
                    ],
                },
            },
            {
                "name": "Final call to action", "type": SectionType.CTA,
                "content": {
                    "heading": "Ready to Build Complete Project Controls Capability?",
                    "body": "Book a one-to-one consultation and we will help you understand the combined pathway, funding position, eligibility and next steps. Funding, support packages and progression support are subject to eligibility, availability and applicable rules. APM ChPP pathway support helps learners prepare for professional progression but does not guarantee Chartered status.",
                    "cta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                },
            },
            {
                "name": "Consultation and eligibility", "type": SectionType.LEAD_FORM, "anchor": "consultation",
                "content": {
                    "tag": "Start a Conversation",
                    "heading": "Check your combined pathway eligibility or book a consultation",
                    "body": "Tell us about your role, organisation and career goals. A member of our team will guide you to the most suitable combined route.",
                    "enquiryTypes": ["Funding eligibility check", "Route-fit consultation", "Employer cohort", "General enquiry"],
                    "buttonLabel": "Book my consultation",
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": "Strategic + Operational PCP Route FAQs",
                    "items": self.strategic_operational_pcp_faqs(),
                },
            },
        ]

    def pmo_pcp_faqs(self):
        return [
            {"id": "what", "question": "What is the PMO Route?", "answer": "The PMO Route is a Project Controls Professional Level 6 apprenticeship route focused on PMO, governance, reporting, assurance, integrated controls and professional standards. It is designed for employed learners with employer support."},
            {"id": "apprenticeship-page", "question": "Is this page for the apprenticeship route?", "answer": "Yes. This page primarily describes the apprenticeship PMO Route. A separate Commercial PMO Route is also available for those who prefer direct access without apprenticeship paperwork."},
            {"id": "funding", "question": "Is apprenticeship funding available?", "answer": "Apprenticeship funding may be available where employer eligibility, learner suitability and applicable funding rules are met. Funding is not guaranteed and is confirmed during consultation."},
            {"id": "requirements", "question": "What does the apprenticeship route require?", "answer": "The apprenticeship route requires workplace evidence, portfolio development, progress reviews, off-the-job learning records and employer engagement in the learning process."},
            {"id": "covers", "question": "What does the PMO Route cover?", "answer": "The route covers Project Management Office, Project Planning and Control, Risk Quality and Issue Management, and Stakeholder Engagement and Communication."},
            {"id": "apm-link", "question": "Is this linked to APM recognition?", "answer": "Yes. The relevant Level 6 PMO component supports an APM-recognised technical-knowledge route for the ChPP standard, subject to APM requirements."},
            {"id": "chpp-guarantee", "question": "Does this route automatically make me ChPP?", "answer": "No. Chartered Project Professional status is awarded only by APM after the candidate meets all applicable professional practice, CPD, ethics and assessment requirements."},
            {"id": "vs-commercial", "question": "What is the difference between the PMO apprenticeship route and the Commercial PMO Route?", "answer": "The apprenticeship route may be funded where eligible but requires workplace evidence, portfolio development, progress reviews and compliance. The Commercial PMO Route is paid directly and is more flexible with lower administration."},
            {"id": "teams", "question": "Can employers enrol PMO teams?", "answer": "Yes. Employers can discuss group delivery for either the apprenticeship route where eligible, or the commercial route for direct purchase."},
            {"id": "start", "question": "How do I start?", "answer": "Book a PMO Route consultation. We will review your role, employer support, funding position and whether the apprenticeship or commercial route is the better fit."},
        ]

    def pmo_pcp_sections(self):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Project Controls Professional Level 6",
                    "title": "A PMO roadmap for better decisions.",
                    "titleAccent": "Build a PMO That Leaders Trust",
                    "body": "A structured Level 6 apprenticeship route for PMO, governance and reporting professionals who want stronger assurance, integrated controls, stakeholder confidence and recognised professional progression.",
                    "tagline": "Funded where eligible · Employer-supported · Workplace-applied · APM-recognised technical-knowledge progression",
                    "primaryCta": {"label": "Check PMO Apprenticeship Eligibility", "url": "#consultation"},
                    "secondaryCta": {"label": "Book a PMO Route Consultation", "url": "#consultation"},
                    "tertiaryLink": {"label": "Explore Commercial PMO Route", "url": "/commercial-project-controls-route"},
                },
            },
            {
                "name": "Trust strip", "type": SectionType.LOGO_MARQUEE,
                "content": {
                    "label": "PMO Route",
                    "items": [
                        {"id": "level6", "name": "Project Controls Professional Level 6"},
                        {"id": "funded", "name": "Funded Where Eligible"},
                        {"id": "employer", "name": "Employer-Supported Learning"},
                        {"id": "evidence", "name": "Workplace Evidence"},
                        {"id": "reviews", "name": "Progress Reviews"},
                        {"id": "apm", "name": "APM Recognised Assessment Route"},
                        {"id": "chpp", "name": "ChPP Readiness Support"},
                        {"id": "delivery", "name": "Live Online Delivery"},
                    ],
                },
            },
            {
                "name": "Introduction", "type": SectionType.RICH_TEXT,
                "content": {
                    "heading": "Get direction for stronger PMO capability.",
                    "body": (
                        "Your PMO may already collect information. The real challenge is turning that information into "
                        "trusted governance, timely assurance and clear decisions.\n\n"
                        "The PMO Route develops professionals who can connect reporting, planning, controls, risk, "
                        "quality and stakeholder communication into a stronger organisational system.\n\n"
                        "This is not simply a classroom course. It is a structured apprenticeship route built around "
                        "live learning, workplace application, evidence, reflection and employer-supported progression.\n\n"
                        "“Better PMOs create confidence before they create reports.”"
                    ),
                },
            },
            {
                "name": "What PMO professionals and employers say", "type": SectionType.CARD_GRID,
                "content": {
                    "heading": "What PMO professionals and employers say",
                    "items": [
                        {"id": "engineering", "title": "PMO Manager", "meta": "Engineering Sector", "body": "The route helped me move beyond reporting activity and start explaining what senior leaders needed to decide."},
                        {"id": "public-sector", "title": "Programme Director", "meta": "Public Sector", "body": "We wanted stronger governance without adding unnecessary bureaucracy. The workplace application made the learning immediately useful."},
                        {"id": "construction", "title": "Project Controls Professional", "meta": "Construction", "body": "I became more confident connecting schedule, risk, reporting and assurance rather than treating them as separate activities."},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Meet the people behind the programmes",
                    "body": "Join specialist Masterclasses, professional events, webinars and information sessions focused on Project Controls, project delivery and professional development.",
                    "items": [
                        {"id": "masterclass", "badge": "Project Controls Masterclass", "title": "Explore specialist Project Controls topics", "body": "Join practitioners to explore specialist Project Controls topics, masterclasses and professional discussions. Format: online.", "cta": {"label": "View Upcoming Events", "url": "#consultation"}},
                        {"id": "info-session", "badge": "Information Session", "title": "Speak with the College", "body": "Join professional webinars and information sessions to speak with the College about programmes, specialist modules and employer development. Format: online.", "cta": {"label": "Book an Information Session", "url": "#consultation"}},
                    ],
                },
            },
            {
                "name": "The PMO journey", "type": SectionType.CARD_GRID, "anchor": "journey",
                "content": {
                    "tag": "The PMO Route",
                    "heading": "Four capabilities to help your PMO become trusted.",
                    "body": "Each capability strengthens a different area of PMO performance. Together, they create a clearer route from project information to governance confidence and better decisions.",
                    "items": [
                        {
                            "id": "governance", "title": "Project Management Office", "meta": "Stage 01 · PMO Governance and Organisational Direction",
                            "body": "Develop the purpose, operating model and governance arrangements of an effective PMO. Workplace outputs: Governance map, RACI matrix, Decision log, Escalation framework, Assurance review.",
                            "includes": ["PMO operating models", "Governance structures", "Decision rights", "Roles and responsibilities", "Assurance reviews", "Stage gates", "Ethics and organisational context"],
                        },
                        {
                            "id": "planning", "title": "Project Planning and Control", "meta": "Stage 02 · PMP-Aligned Capability",
                            "body": "Connect scope, schedule, cost, resources, performance and change into a credible integrated control environment. Workplace outputs: WBS, Integrated baseline, Schedule analysis, Performance report, Change log.",
                            "includes": ["Work breakdown structures", "Planning and scheduling", "Baseline management", "Critical path", "Performance reporting", "Forecasting", "Change control"],
                        },
                        {
                            "id": "risk", "title": "Risk, Quality and Issue Management", "meta": "Stage 03 · Assurance and Continuous Improvement",
                            "body": "Move from static registers and reactive escalation towards stronger risk ownership, issue discipline, quality assurance and continuous improvement. Workplace outputs: Risk and issue register, Risk response plan, Quality plan, Assurance checklist, Lessons learned record.",
                            "includes": ["Risk identification", "Risk response", "Issue management", "Quality planning", "Assurance", "Root-cause analysis", "Lessons learned"],
                        },
                        {
                            "id": "stakeholder", "title": "Stakeholder Engagement and Communication", "meta": "Stage 04 · PMP-Aligned Capability",
                            "body": "Translate project information into clear messages, executive reporting, options and recommendations that help stakeholders act with confidence. Workplace outputs: Stakeholder map, Engagement plan, Executive dashboard, Exception report, Benefits report.",
                            "includes": ["Stakeholder analysis", "Communication planning", "Executive reporting", "Dashboard narrative", "Benefits visibility", "Engagement", "Escalation communication"],
                        },
                    ],
                },
            },
            {
                "name": "Pathway call to action", "type": SectionType.CTA,
                "content": {
                    "heading": "Four capabilities. One route to a PMO that leaders trust.",
                    "body": "Build governance confidence, integrated controls, risk and quality discipline, and decision-ready stakeholder reporting through a structured workplace apprenticeship.",
                    "cta": {"label": "Check Apprenticeship Eligibility", "url": "#consultation"},
                },
            },
            {
                "name": "Why this route exists", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Why This Route Exists",
                    "heading": "It is time to stop asking PMOs only for reports.",
                    "body": "A PMO should not simply chase updates, maintain templates and distribute dashboards. It should help leaders understand confidence, risk, priorities, options and action.",
                    "items": [
                        {"id": "governance-confidence", "title": "Governance Confidence", "body": "Clarify who decides, who escalates and how assurance should work."},
                        {"id": "reporting-meaning", "title": "Reporting With Meaning", "body": "Explain what the information means and what decision is required."},
                        {"id": "integrated-controls", "title": "Integrated Controls", "body": "Connect schedule, cost, risk, quality, issues and change."},
                        {"id": "assurance", "title": "Assurance Before Failure", "body": "Identify warning signs before they become delivery surprises."},
                        {"id": "influence", "title": "Professional PMO Influence", "body": "Help PMO professionals contribute confidently in senior forums."},
                    ],
                },
            },
            {
                "name": "APM recognition", "type": SectionType.FEATURE_GRID, "anchor": "apm",
                "content": {
                    "tag": "Professional Recognition",
                    "heading": "APM Recognition — Pathway 2",
                    "body": "The relevant Certified PMO Professional Level 6 element supports an APM-recognised technical-knowledge assessment route for ChPP Pathway 2, subject to APM eligibility, currency and current requirements.",
                    "items": [
                        {"id": "technical-knowledge", "title": "APM Technical Knowledge", "body": "Recognised technical knowledge for the ChPP journey."},
                        {"id": "readiness", "title": "ChPP Readiness Support", "body": "Learners receive support to understand readiness, organise evidence and prepare for professional progression."},
                        {"id": "status-note", "title": "Important Chartered Status Note", "body": "Completion does not automatically confer ChPP. Chartered Project Professional status is awarded only by APM after all applicable professional practice, CPD, ethics and assessment requirements are met."},
                    ],
                },
            },
            {
                "name": "Expert insight behind the PMO route", "type": SectionType.CARD_GRID,
                "content": {
                    "heading": "Expert insight behind the PMO Route",
                    "items": [
                        {"id": "ray-mead", "title": "Dr Ray Mead", "meta": "PMO Author and Project Leadership Expert", "body": "Dr Ray Mead brings deep PMO and project leadership expertise, helping professionals connect governance, controls, PMO maturity and organisational decision-making."},
                        {"id": "stephen-jenner", "title": "Stephen Jenner", "meta": "Project Portfolio and Benefits Realisation Management Expert", "body": "Stephen Jenner brings specialist expertise in portfolio management and benefits realisation, strengthening the route's focus on strategic alignment, value and decision confidence. Chief Examiner for APMG's Managing Benefits and Managing Portfolios Certifications."},
                    ],
                },
            },
            {
                "name": "Develop PMO capability inside your organisation", "type": SectionType.FEATURE_GRID, "anchor": "employers",
                "content": {
                    "heading": "Develop PMO capability inside your organisation.",
                    "items": [
                        {"id": "governance", "title": "Stronger Governance", "body": "Improve decision rights, escalation, assurance and reporting lines."},
                        {"id": "reporting", "title": "Better Reporting", "body": "Turn status updates into insight, options and recommendations."},
                        {"id": "controls", "title": "Integrated Controls", "body": "Connect planning, cost, risk, quality, issues and change."},
                        {"id": "confidence", "title": "Delivery Confidence", "body": "Improve visibility and earlier intervention."},
                        {"id": "alignment", "title": "Stakeholder Alignment", "body": "Strengthen communication with boards, sponsors and delivery teams."},
                        {"id": "retention", "title": "Retention and Progression", "body": "Develop future PMO managers and project controls leaders."},
                    ],
                },
            },
            {
                "name": "A workplace development journey", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern", "anchor": "apprenticeship",
                "content": {
                    "heading": "A workplace development journey, not just a course.",
                    "body": "Structured around live learning, workplace application, evidence collection and employer-supported progress. Funded where eligible · Employer-supported · Workplace evidence required · Off-the-job learning records · Progress reviews · Quality and compliance requirements.",
                    "items": [
                        {"id": "learn", "title": "Learn", "meta": "Step 1", "body": "Live 2-hour tutor-led sessions."},
                        {"id": "apply", "title": "Apply", "meta": "Step 2", "body": "Use learning in real PMO, governance and reporting activity."},
                        {"id": "evidence", "title": "Evidence", "meta": "Step 3", "body": "Collect workplace outputs, reflection and portfolio evidence."},
                        {"id": "review", "title": "Review", "meta": "Step 4", "body": "Complete structured progress reviews with employer support."},
                        {"id": "improve", "title": "Improve", "meta": "Step 5", "body": "Use feedback to strengthen professional practice and organisational capability."},
                    ],
                },
            },
            {
                "name": "Apprenticeship or commercial access", "type": SectionType.CARD_GRID, "variant": "programme",
                "content": {
                    "tag": "Alternative Access",
                    "heading": "Want the PMO Route without apprenticeship paperwork?",
                    "body": "Explore the separate Commercial PMO Route for direct access, assignment-based assessment and more flexible delivery.",
                    "items": [
                        {
                            "id": "apprenticeship", "badge": "Apprenticeship PMO Route",
                            "title": "Structured workplace development, funded where eligible.",
                            "body": "For employed learners with employer support who can complete workplace evidence, progress reviews, off-the-job learning records and apprenticeship requirements.",
                            "includes": ["Funded where eligible", "Employer-supported", "Workplace evidence", "Portfolio development", "Progress reviews", "Compliance requirements"],
                            "cta": {"label": "Check Eligibility", "url": "#consultation"},
                        },
                        {
                            "id": "commercial", "badge": "Commercial PMO Route",
                            "title": "Direct access with less apprenticeship administration.",
                            "body": "For professionals and employers who prefer assignment-based assessment, certificate outcomes and flexible commercial delivery.",
                            "includes": ["Direct commercial access", "Assignment-based assessment", "Certificate outcome", "Less apprenticeship administration", "No apprenticeship progress reviews", "No off-the-job evidence logs", "Flexible employer group delivery", "Weekend or agreed delivery options"],
                            "cta": {"label": "Explore Commercial PMO Route", "url": "/commercial-project-controls-route"},
                        },
                    ],
                },
            },
            {
                "name": "PMO insights", "type": SectionType.CARD_GRID,
                "content": {
                    "heading": "PMO Insights",
                    "items": [
                        {"id": "decision-confidence", "badge": "Featured", "title": "Why Strong PMOs Focus on Decision Confidence", "body": "Strong PMOs do not simply report status. They build the confidence that enables better decisions, clearer governance and more reliable delivery.", "cta": {"label": "Read more", "url": "/knowledge-hub"}},
                        {"id": "status-to-insight", "title": "From Status Reporting to Executive Insight", "cta": {"label": "Read", "url": "/knowledge-hub"}},
                        {"id": "integrated-governance", "title": "How Integrated Controls Improve Governance", "cta": {"label": "Read", "url": "/knowledge-hub"}},
                        {"id": "apm-chpp", "title": "APM Recognition and the ChPP Journey", "cta": {"label": "Read", "url": "/knowledge-hub"}},
                    ],
                },
            },
            {
                "name": "Enquiry form", "type": SectionType.LEAD_FORM, "anchor": "consultation",
                "content": {
                    "heading": "Have any questions?",
                    "body": "No obligation. We will help you understand whether the apprenticeship PMO Route or separate Commercial PMO Route is the better fit.",
                    "enquiryTypes": ["Apprenticeship eligibility", "Commercial PMO Route", "Employer group delivery", "APM recognition", "ChPP readiness", "Not sure"],
                    "buttonLabel": "Book My PMO Consultation",
                },
            },
            {
                "name": "Closing call to action", "type": SectionType.CTA,
                "content": {
                    "heading": "A PMO roadmap for better decisions.",
                    "body": "Move from reporting activity to governance confidence, integrated controls and trusted professional influence.",
                    "cta": {"label": "Check PMO Apprenticeship Eligibility", "url": "#consultation"},
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": "PMO Route, clearly explained",
                    "items": self.pmo_pcp_faqs(),
                },
            },
        ]

    def sector_route_sections(self, cfg):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Fully Funded Where Eligible",
                    "title": cfg["headline"],
                    "body": cfg["subheadline"],
                    "secondaryBody": cfg["description"],
                    "tagline": "Fully Funded Where Eligible · Up to £27,000 Government Funding Band · APM ChPP Readiness Support · Workplace Evidence Support",
                    "primaryCta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                    "secondaryCta": {"label": "Check Funding Eligibility", "url": "#consultation"},
                    "tertiaryLink": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                },
            },
            {
                "name": "Gold ticker", "type": SectionType.LOGO_MARQUEE,
                "content": {
                    "label": cfg["sector_label"] + " Route",
                    "items": [{"id": f"ticker-{i}", "name": item} for i, item in enumerate(cfg["ticker_items"])],
                },
            },
            {
                "name": "Sector capability", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": cfg["capability_tag"],
                    "heading": cfg["capability_heading"],
                    "body": cfg["capability_body"],
                    "items": [{"id": f"capability-{i}", "title": title, "body": body} for i, (title, body) in enumerate(cfg["capability_items"])],
                },
            },
            {
                "name": "Why this route", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Why This Route",
                    "heading": cfg["problems_heading"],
                    "items": [{"id": f"problem-{i}", "title": title, "body": body} for i, (title, body) in enumerate(cfg["problems_items"])],
                },
            },
            {
                "name": "The sector process", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern",
                "content": {
                    "heading": cfg["process_heading"],
                    "body": cfg["process_body"],
                    "items": [{"id": f"step-{i}", "title": title, "meta": f"Step 0{i + 1}", "body": body} for i, (title, body) in enumerate(cfg["process_items"])],
                },
            },
            {
                "name": "Sector value", "type": SectionType.STATS,
                "content": {
                    "items": [
                        {"id": "funding-band", "value": "£27,000", "label": "Government funding band where eligible"},
                        {"id": "areas", "value": "3", "label": cfg["stats_areas_label"]},
                        {"id": "consultation", "value": "1", "label": "Route-fit consultation to confirm the best pathway"},
                    ],
                },
            },
            {
                "name": "Choose your access route", "type": SectionType.CARD_GRID, "variant": "programme",
                "content": {
                    "heading": "Choose the Right Access Route",
                    "items": [
                        {
                            "id": "apprenticeship", "badge": "Fully Funded Where Eligible", "highlighted": True, "ribbon": "Fully Funded Where Eligible",
                            "title": "Apprenticeship Route",
                            "body": cfg["apprenticeship_body"],
                            "cta": {"label": "Check Apprenticeship Eligibility", "url": "#consultation"},
                        },
                        {
                            "id": "commercial", "badge": "For Non-Eligible Learners",
                            "title": "Commercial Route",
                            "body": "For self-funded professionals, self-employed learners or applicants who are not eligible for apprenticeship funding.",
                            "cta": {"label": "Explore Commercial Route", "url": "/commercial-project-controls-route"},
                        },
                    ],
                },
            },
            {
                "name": "Who this route is for", "type": SectionType.CARD_GRID, "anchor": "who-for",
                "content": {
                    "heading": cfg["who_for_heading"],
                    "items": [
                        {"id": "professionals", "title": "For Professionals", "meta": "Best suited to", "includes": cfg["professional_roles"]},
                        {"id": "employers", "title": "For Employers", "meta": "Best suited to organisations that need", "includes": cfg["employer_needs"]},
                    ],
                },
            },
            {
                "name": "What you develop", "type": SectionType.FEATURE_GRID, "anchor": "develop",
                "content": {
                    "heading": cfg["develop_heading"],
                    "body": "Each capability area builds directly on workplace practice and is assessed through real evidence.",
                    "items": [{"id": f"develop-{i}", "title": title, "body": body} for i, (title, body) in enumerate(cfg["develop_items"])],
                },
            },
            {
                "name": "Sector project controls in practice", "type": SectionType.CARD_GRID,
                "content": {
                    "heading": cfg["testimonials_heading"],
                    "items": [
                        {"id": f"testimonial-{i}", "title": name, "meta": sector, "body": quote}
                        for i, (quote, name, sector) in enumerate(cfg["testimonials"])
                    ] + [
                        {"id": "case-study", "title": cfg["case_study_title"], "body": cfg["case_study_body"], "cta": {"label": "Read Employer Case Study", "url": "/testimonials"}},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Meet the people behind the programmes",
                    "body": "Join specialist Masterclasses, professional events, webinars and information sessions focused on Project Controls, project delivery and professional development.",
                    "items": [
                        {"id": "masterclass", "badge": "Project Controls Masterclass", "title": "Explore specialist Project Controls topics", "body": "Join practitioners to explore specialist Project Controls topics, masterclasses and professional discussions. Format: online.", "cta": {"label": "View Upcoming Events", "url": "#consultation"}},
                        {"id": "info-session", "badge": "Information Session", "title": "Speak with the College", "body": "Join professional webinars and information sessions to speak with the College about programmes, specialist modules and employer development. Format: online.", "cta": {"label": "Book an Information Session", "url": "#consultation"}},
                    ],
                },
            },
            {
                "name": "Final call to action", "type": SectionType.CTA,
                "content": {
                    "heading": cfg["final_cta_heading"],
                    "body": "Book a one-to-one consultation and we will help you understand the route, funding position, eligibility and next steps. Funding, support packages and progression support are subject to eligibility, availability and applicable rules. APM ChPP pathway support helps learners prepare for professional progression but does not guarantee Chartered status.",
                    "cta": {"label": "Book a Route-Fit Consultation", "url": "#consultation"},
                },
            },
            {
                "name": "Consultation and eligibility", "type": SectionType.LEAD_FORM, "anchor": "consultation",
                "content": {
                    "tag": "Start a Conversation",
                    "heading": cfg["consultation_heading"],
                    "body": cfg["consultation_body"],
                    "enquiryTypes": ["Funding eligibility check", "Route-fit consultation", "Employer cohort", "General enquiry"],
                    "buttonLabel": "Book my consultation",
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": cfg["faq_heading"],
                    "items": cfg["faqs"],
                },
            },
        ]

    def sector_route_configs(self):
        return {
            "operational-pcp-construction": {
                "page_title": "Construction Project Controls Route",
                "page_description": "A fully funded Level 6 pathway for construction professionals, building NEC change control, construction scheduling, subcontractor coordination and evidence-based reporting capability.",
                "sector_label": "Construction",
                "headline": "Stop Letting Schedule Delays and Cost Drift Become Normal on Your Construction Programmes.",
                "subheadline": "A fully funded Level 6 pathway where eligible, designed for construction professionals who manage schedules, cost, NEC change control and reporting across build programmes.",
                "description": "Delay and cost drift are not inevitable. They are symptoms of weak project controls capability. Build the discipline to see problems earlier and control them faster — on every construction programme.",
                "ticker_items": ["Fully Funded Where Eligible", "Up to £27,000 Government Funding Band", "NEC Change Control & Construction Scheduling", "APM ChPP Readiness Support", "Build Internal Construction Controls Teams", "Book a 15-Minute Route-Fit Consultation"],
                "capability_tag": "Construction Capability",
                "capability_heading": "Develop Construction Project Controls That Reduce Delay and Cost Drift",
                "capability_body": "This route builds construction-specific controls capability — from NEC contract management and scheduling to subcontractor coordination and evidence-based reporting.",
                "capability_items": [
                    ("Construction Schedule Mastery", "Develop structured, logic-linked schedules with realistic baselines and critical path analysis for build programmes."),
                    ("Earned Value & Cost Tracking", "Track cost performance against baseline with variance analysis and forecast at completion."),
                    ("NEC Change Control Discipline", "Build rigorous change control processes that protect commercial position and maintain contract compliance."),
                ],
                "problems_heading": "Construction Delivery Challenges That Stronger Controls Solve",
                "problems_items": [
                    ("Schedule Delays on Complex Build Programmes", "Critical path issues surface too late to take corrective action before the delay impacts delivery."),
                    ("Cost Overruns Eroding Project Margins", "Cost reports arrive after spending decisions have been made — no chance to course-correct."),
                    ("Subcontractor Coordination Across Multiple Packages", "Multiple packages and interfaces create gaps in visibility that nobody owns or tracks."),
                    ("NEC Contract Change Control Administration", "Change is treated as paperwork rather than a commercial discipline that protects position."),
                    ("Inconsistent Progress Reporting Across Sites", "Stakeholders receive status updates that describe what happened, not what is about to happen."),
                    ("Weak Baseline Management Leading to Scope Creep", "Baselines drift without structured change control, undermining forecast confidence."),
                ],
                "process_heading": "From Construction Chaos to Controlled Delivery",
                "process_body": "A practical pathway for turning construction project controls into reliable delivery performance.",
                "process_items": [
                    ("Plan with Discipline", "Build structured, logic-linked schedules with realistic baselines and critical path analysis for every build programme."),
                    ("Control Cost and Change", "Track earned value, manage NEC change control and maintain baseline integrity throughout the programme lifecycle."),
                    ("Report with Evidence", "Deliver progress reports based on milestones, deliverables and earned value — not opinion or guesswork."),
                ],
                "stats_areas_label": "Core areas: Schedule, Cost and NEC Control",
                "apprenticeship_body": "For eligible employers and learners in England. Suitable for construction planners, schedulers, cost engineers and project controllers on build programmes.",
                "who_for_heading": "Who Should Choose the Construction PCP Route?",
                "professional_roles": ["Construction Planners", "Site-Based Schedulers", "Cost Engineers", "Project Controllers", "Assistant Project Managers", "Delivery Team Members", "NEC Contract Administrators", "Progress Report Writers"],
                "employer_needs": ["Stronger construction schedule discipline", "Better cost and earned value visibility", "Rigorous NEC change control", "Evidence-based progress reporting", "Internal construction controls capability", "Structured progression for build teams"],
                "develop_heading": "Construction Capabilities Learners Develop",
                "develop_items": [
                    ("Construction Scheduling", "Structured, logic-linked schedules with critical path analysis for build programmes."),
                    ("Earned Value & Cost", "Track cost performance with variance analysis and forecast at completion."),
                    ("NEC Change Control", "Rigorous change control processes protecting commercial position and compliance."),
                    ("Site-Level Reporting", "Evidence-based progress tracking across multiple sites and subcontractors."),
                    ("Subcontractor Coordination", "Structured interface management reducing gaps between packages."),
                    ("APM ChPP Readiness", "Professional evidence towards Chartered status with construction portfolio."),
                ],
                "testimonials_heading": "Construction Project Controls in Practice",
                "testimonials": [
                    ("The construction-focused PCP helped me move from reactive firefighting to proactive schedule control. Our NEC change process is now properly managed.", "Tom Davies", "Senior Planner — Commercial Construction"),
                    ("Before this programme, our progress reports were always reactive. Now we identify issues before they become problems.", "Priya Sharma", "Senior Planner — Infrastructure"),
                    ("The NEC change control module changed how we manage commercial risk on our build programmes. Proper discipline, not just paperwork.", "Cost Engineer", "Major Construction Programme"),
                ],
                "case_study_title": "Strengthening Schedule and Cost Control Across a Build Programme",
                "case_study_body": "How a commercial construction employer used the Construction PCP Route to improve planning discipline and NEC change management.",
                "final_cta_heading": "Ready to Build Stronger Construction Project Controls?",
                "consultation_heading": "Check your construction route eligibility or book a consultation",
                "consultation_body": "Tell us about your construction role, organisation and funding position. A member of our team will guide you to the most suitable route.",
                "faq_heading": "Construction PCP Route FAQs",
                "faqs": [
                    {"id": "specific", "question": "Is this route specific to construction project controls?", "answer": "Yes. This Operational PCP route is tailored for construction, building and urban development programmes. It focuses on NEC contract management, scheduling for build programmes, subcontractor coordination and construction-specific progress reporting."},
                    {"id": "skills", "question": "What construction-specific skills will I develop?", "answer": "NEC change control, construction programme scheduling, critical path analysis for build sequences, subcontractor progress tracking, earned value on construction projects, and construction-specific risk and cost management."},
                    {"id": "who", "question": "Who is this route for?", "answer": "Planners, schedulers, cost engineers, project controllers and PMO analysts working in construction, building, urban development and civil engineering. Also suitable for assistant project managers and site-based project support staff moving into project controls."},
                    {"id": "career", "question": "How does this support my construction career?", "answer": "The programme builds directly applicable skills for construction project controls. Workplace evidence is gathered from your actual construction projects. This makes the qualification immediately relevant to your employer and your career progression."},
                    {"id": "funded", "question": "Is this route fully funded?", "answer": "The Construction PCP Route is fully funded where eligible. For qualifying employers and learners in England, the Department for Education funding band is up to £27,000."},
                    {"id": "eligible-meaning", "question": "What does “Fully Funded Where Eligible” mean?", "answer": "Eligibility depends on the learner's place of work, employment status, role relevance and prior qualifications. Levy-paying employers get 100% coverage. Non-levy payers receive 95% government contribution."},
                    {"id": "delivery", "question": "How is the programme delivered?", "answer": "Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks."},
                    {"id": "cohorts", "question": "Can employers enrol multiple learners?", "answer": "Yes. Many employers enrol cohorts across planning, cost, risk and PMO functions. Group delivery can be arranged for organisations building controls capability at scale."},
                ],
            },
            "operational-pcp-engineering": {
                "page_title": "Engineering & Aerospace Project Controls Route",
                "page_description": "A fully funded Level 6 pathway for engineering and manufacturing professionals, building integrated schedule, cost, risk and compliance control across regulated production environments.",
                "sector_label": "Engineering & Aerospace",
                "headline": "For Regulated Environments Where Quality, Compliance and Delivery All Matter.",
                "subheadline": "A fully funded Level 6 pathway where eligible, designed for professionals managing complex engineering, manufacturing and regulated delivery programmes.",
                "description": "Integrate schedule, cost, risk and compliance control across engineering and manufacturing programmes. Build audit-ready documentation, supplier milestone tracking and evidence-based forecasting that satisfies regulatory and customer requirements.",
                "ticker_items": ["Fully Funded Where Eligible", "Up to £27,000 Government Funding Band", "Integrated Schedule, Cost & Compliance Control", "APM ChPP Readiness Support", "Build Internal Engineering Controls Teams", "Book a 15-Minute Route-Fit Consultation"],
                "capability_tag": "Engineering Capability",
                "capability_heading": "Develop Integrated Controls for Engineering and Regulated Delivery",
                "capability_body": "This route builds engineering-specific controls capability — from integrated schedule, cost and risk management to audit-ready documentation and regulatory compliance.",
                "capability_items": [
                    ("Integrated Controls", "Manage schedule, cost and risk as one discipline across complex engineering and production environments."),
                    ("Supplier Milestone Tracking", "Track supplier deliverables and interface milestones with the same rigour as internal production."),
                    ("Audit-Ready Documentation", "Build AS9100, ISO 13485 and GxP compliance evidence into project controls routines."),
                ],
                "problems_heading": "Engineering and Regulated Delivery Challenges That Integrated Controls Solve",
                "problems_items": [
                    ("Complex Production and Engineering Dependencies", "A supplier delay in one area triggers knock-on effects across the entire production and assembly timeline."),
                    ("Supplier Delays Impacting Programme Milestones", "External dependencies create gaps in visibility that undermine programme forecasts."),
                    ("Quality and Regulatory Compliance Requirements", "Audit-ready evidence compiled at the end of the programme, not built into controls from day one."),
                    ("Cost Forecasting Across Long Production Cycles", "Cost estimates rely on assumptions rather than earned value, variance analysis and forecast at completion."),
                    ("Manufacturing and Technical Programme Control", "Production managed in silos with no integrated view of programme health — leaving gaps nobody owns."),
                    ("Regulated Delivery and Documentation Requirements", "Quality and compliance problems surface during final review — too late to correct without cost and delay."),
                ],
                "process_heading": "From Siloed Production to Integrated Programme Control",
                "process_body": "A pathway for building integrated controls across engineering, manufacturing and regulated delivery programmes.",
                "process_items": [
                    ("Connect the Data", "Integrate schedule, cost, risk and supplier milestone data into one consistent programme view."),
                    ("Build Compliance In", "Embed audit-ready documentation, quality checkpoints and regulatory evidence into project controls routines."),
                    ("Forecast with Confidence", "Use earned value and variance analysis to give leadership real confidence in cost and schedule delivery."),
                ],
                "stats_areas_label": "Core areas: Schedule, Cost and Compliance",
                "apprenticeship_body": "For eligible employers and learners in England. Suitable for engineering planners, manufacturing controllers, quality assurance professionals and production planners.",
                "who_for_heading": "Who Should Choose the Engineering & Aerospace Route?",
                "professional_roles": ["Engineering Planners", "Manufacturing Controllers", "Quality Assurance Professionals", "Production Planners", "Cost Engineers", "PMO Analysts", "Regulatory Compliance Leads", "Supplier Programme Managers"],
                "employer_needs": ["Integrated schedule, cost and risk control", "Supplier milestone tracking and interface management", "Audit-ready documentation and compliance", "Evidence-based cost and schedule forecasting", "Internal engineering controls capability", "Structured progression for production teams"],
                "develop_heading": "Engineering Capabilities Learners Develop",
                "develop_items": [
                    ("Integrated Controls", "Manage schedule, cost and risk as one discipline across complex environments."),
                    ("Supplier Tracking", "Track supplier deliverables with the same rigour as internal production."),
                    ("Audit-Ready Docs", "Build AS9100, ISO 13485 and GxP compliance into controls routines."),
                    ("Regulatory Compliance", "Strengthen governance satisfying regulatory and customer requirements."),
                    ("Reliable Forecasting", "Earned value and variance analysis for leadership confidence."),
                    ("APM ChPP Readiness", "Professional evidence towards Chartered status with engineering portfolio."),
                ],
                "testimonials_heading": "Engineering Project Controls in Practice",
                "testimonials": [
                    ("The engineering-focused PCP helped us integrate supplier milestones with our internal production schedule. Audit-ready documentation is now built into our process.", "Dr. Hannah Reeves", "Programme Controls Lead — Aerospace"),
                    ("Before this programme, our cost forecasts were based on hope. Now we use earned value and variance analysis — real evidence, not assumptions.", "Manufacturing Controller", "Engineering Programme"),
                    ("The compliance module transformed how we approach AS9100 evidence. Project controls now support quality, not add to the burden.", "Quality Assurance Lead", "Aerospace Manufacturing"),
                ],
                "case_study_title": "Integrating Controls Across a Complex Manufacturing Programme",
                "case_study_body": "How an aerospace employer used the Engineering PCP Route to integrate supplier tracking, cost control and compliance documentation.",
                "final_cta_heading": "Ready to Build Stronger Engineering Project Controls?",
                "consultation_heading": "Check your engineering route eligibility or book a consultation",
                "consultation_body": "Tell us about your engineering role, organisation and funding position. A member of our team will guide you to the most suitable route.",
                "faq_heading": "Engineering & Aerospace PCP Route FAQs",
                "faqs": [
                    {"id": "suitable", "question": "Is this route suitable for engineering and manufacturing?", "answer": "Yes. This Operational PCP route is tailored for engineering, manufacturing, aerospace, medicals and pharmaceutical sectors. It addresses regulated delivery, complex production dependencies and quality compliance."},
                    {"id": "vs-construction", "question": "What makes this different from the construction route?", "answer": "While core project controls skills are the same, this route focuses on manufacturing and engineering-specific challenges: supplier milestone tracking, regulated documentation, quality compliance and technical programme control."},
                    {"id": "roles", "question": "Which roles benefit most?", "answer": "Planners, cost engineers, project controllers, quality assurance professionals, production planners and PMO analysts in engineering, manufacturing, aerospace, medical devices and pharmaceuticals."},
                    {"id": "regulated", "question": "How does this support regulated industries?", "answer": "The programme emphasises audit-ready documentation, governance frameworks and compliance-aware project controls. Relevant for aerospace (AS9100), medical devices (ISO 13485) and pharmaceuticals (GxP) environments."},
                    {"id": "funded", "question": "Is this route fully funded?", "answer": "The Engineering PCP Route is fully funded where eligible. For qualifying employers and learners in England, the Department for Education funding band is up to £27,000."},
                    {"id": "eligible-meaning", "question": "What does “Fully Funded Where Eligible” mean?", "answer": "Eligibility depends on the learner's place of work, employment status, role relevance and prior qualifications. Levy-paying employers get 100% coverage. Non-levy payers receive 95% government contribution."},
                    {"id": "delivery", "question": "How is the programme delivered?", "answer": "Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks."},
                    {"id": "cohorts", "question": "Can employers enrol multiple learners?", "answer": "Yes. Many employers enrol cohorts across planning, cost, risk and quality functions. Group delivery can be arranged for organisations building controls capability at scale."},
                ],
            },
            "operational-pcp-public-sector": {
                "page_title": "Public Sector & Councils Project Controls Route",
                "page_description": "A fully funded Level 6 pathway for public sector and council professionals, building governance, value-for-money assurance, audit-ready evidence and benefits realisation capability.",
                "sector_label": "Public Sector",
                "headline": "Build Project Controls Capability for Public Money, Public Scrutiny and Better Delivery Confidence.",
                "subheadline": "A fully funded Level 6 pathway where eligible, designed for public sector professionals managing project controls across government, council and public service programmes.",
                "description": "Public sector programme delivery faces unique pressures: value-for-money, public accountability, audit requirements and political scrutiny. Build the controls capability that turns these pressures into delivery confidence.",
                "ticker_items": ["Fully Funded Where Eligible", "Up to £27,000 Government Funding Band", "Public Accountability & Value-for-Money", "APM ChPP Readiness Support", "Build Internal Public Sector Controls Teams", "Book a 15-Minute Route-Fit Consultation"],
                "capability_tag": "Public Sector Capability",
                "capability_heading": "Develop Project Controls for Public Accountability and Better Delivery",
                "capability_body": "This route builds public sector-specific controls capability — from value-for-money governance and audit-ready evidence to benefits realisation and transparent reporting.",
                "capability_items": [
                    ("Decision-Ready Reporting", "Programme reports that satisfy elected members, scrutiny committees and external audit while driving better decisions."),
                    ("Better Governance", "Structured governance frameworks with clear accountability and decision-making authority across complex structures."),
                    ("Risk & Issue Management", "Risk frameworks that surface issues early and track mitigations to closure with public accountability."),
                ],
                "problems_heading": "Public Sector Delivery Challenges That Stronger Controls Address",
                "problems_items": [
                    ("Value-for-Money Pressure on Public Programmes", "Every pound of public money must demonstrate return — weak controls make this impossible to prove."),
                    ("Public Accountability and Scrutiny", "Programme reports produced to satisfy audit rather than drive better delivery — creating a defensive culture."),
                    ("Governance and Audit Requirements", "Teams worry about audit findings because controls are not designed for assurance from the start."),
                    ("Complex Supplier Ecosystems and Frameworks", "Multiple suppliers and framework agreements create gaps in visibility and accountability."),
                    ("Programme Reporting to Multiple Stakeholders", "Reports that explain the past but do not inform the next decision — too late to act."),
                    ("Benefits Realisation and Outcomes Tracking", "Benefits tracking lost in the gap between delivery and handover — outcomes never materialise."),
                ],
                "process_heading": "From Reactive Scrutiny to Proactive Delivery Confidence",
                "process_body": "A pathway for turning public sector pressures into delivery confidence and public trust.",
                "process_items": [
                    ("Govern with Structure", "Establish clear accountability, defined ownership and structured governance that satisfies scrutiny and drives decisions."),
                    ("Report with Evidence", "Build audit-ready evidence and transparent reporting into project controls from day one — not as an afterthought."),
                    ("Track the Benefits", "Integrate benefits realisation with programme controls from business case through to operational handover."),
                ],
                "stats_areas_label": "Core areas: Governance, Reporting and Benefits",
                "apprenticeship_body": "For eligible employers and learners in England. Suitable for council project controllers, government PMO analysts, public sector planners and NHS programme staff.",
                "who_for_heading": "Who Should Choose the Public Sector Route?",
                "professional_roles": ["Council Project Controllers", "Government PMO Analysts", "Public Sector Planners", "NHS Programme Staff", "Transport Authority Staff", "Benefits Realisation Leads", "Local Authority Officers", "Public Service Delivery Teams"],
                "employer_needs": ["Better governance and public accountability", "Audit-ready evidence and transparent reporting", "Value-for-money assurance", "Benefits realisation tracking", "Internal public sector controls capability", "Structured progression for programme teams"],
                "develop_heading": "Public Sector Capabilities Learners Develop",
                "develop_items": [
                    ("Decision-Ready Reporting", "Reports that satisfy scrutiny while driving better delivery decisions."),
                    ("Better Governance", "Structured frameworks with clear accountability and authority."),
                    ("Risk & Issue Management", "Risk frameworks surfacing issues early with public accountability."),
                    ("Clearer Accountability", "Defined ownership of programme outcomes across complex structures."),
                    ("Audit-Ready Evidence", "Controls designed for assurance, reducing audit burden."),
                    ("Delivery Confidence", "Evidence-based forecasting strengthening public trust in delivery."),
                ],
                "testimonials_heading": "Public Sector Project Controls in Practice",
                "testimonials": [
                    ("The public sector PCP gave our team the governance rigour and reporting discipline needed for our capital programme. Audit-ready evidence is no longer a scramble.", "Sarah Mitchell", "Programme Controls Manager — County Council"),
                    ("Before this programme, our benefits realisation tracking was lost in the gap between delivery and handover. Now it is integrated from day one.", "Benefits Realisation Lead", "Local Authority"),
                    ("Our programme board now receives reports that satisfy scrutiny and drive better decisions. Not just explanations of what went wrong.", "PMO Analyst", "Government Programme"),
                ],
                "case_study_title": "Strengthening Governance and Reporting Across a Council Capital Programme",
                "case_study_body": "How a county council used the Public Sector PCP Route to build audit-ready controls and benefits tracking.",
                "final_cta_heading": "Ready to Build Stronger Public Sector Project Controls?",
                "consultation_heading": "Check your public sector route eligibility or book a consultation",
                "consultation_body": "Tell us about your public sector role, organisation and funding position. A member of our team will guide you to the most suitable route.",
                "faq_heading": "Public Sector PCP Route FAQs",
                "faqs": [
                    {"id": "tailored", "question": "Is this route tailored for public sector project controls?", "answer": "Yes. This Operational PCP route is specifically designed for public sector, council and government delivery contexts. It addresses value-for-money requirements, public accountability, governance frameworks and benefits realisation."},
                    {"id": "who", "question": "Who is this route for?", "answer": "Project controllers, PMO analysts, planners, schedulers and cost engineers working in local authorities, central government, NHS trusts, education, transport authorities, and other public sector bodies."},
                    {"id": "levy", "question": "How does the apprenticeship levy affect public sector employers?", "answer": "Public sector organisations that pay the apprenticeship levy can use their levy funds to cover the cost of this programme. Many public sector bodies have significant levy pots that can be used to support project controls capability development."},
                    {"id": "accountability", "question": "How does this support public accountability?", "answer": "The programme emphasises audit-ready evidence, transparent reporting, governance frameworks and benefits realisation tracking — all essential for demonstrating value-for-money and public accountability."},
                    {"id": "funded", "question": "Is this route fully funded?", "answer": "The Public Sector PCP Route is fully funded where eligible. For qualifying employers and learners in England, the Department for Education funding band is up to £27,000."},
                    {"id": "eligible-meaning", "question": "What does “Fully Funded Where Eligible” mean?", "answer": "Eligibility depends on the learner's place of work, employment status, role relevance and prior qualifications. Levy-paying employers get 100% coverage. Non-levy payers receive 95% government contribution."},
                    {"id": "delivery", "question": "How is the programme delivered?", "answer": "Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks."},
                    {"id": "cohorts", "question": "Can employers enrol multiple learners?", "answer": "Yes. Many employers enrol cohorts across programme controls, planning and governance functions. Group delivery can be arranged for organisations building capability at scale."},
                ],
            },
            "operational-pcp-energy": {
                "page_title": "Energy & Net Zero Project Controls Route",
                "page_description": "A fully funded Level 6 pathway for energy and utilities professionals, building capital programme baseline control, integrated forecasting and assurance-ready governance.",
                "sector_label": "Energy & Net Zero",
                "headline": "For Capital Programmes Where Weak Controls Are Too Expensive to Ignore.",
                "subheadline": "A fully funded Level 6 pathway where eligible, designed for professionals managing project controls across energy, utilities and capital programmes.",
                "description": "In capital programmes, the cost of weak controls compounds over years — not months. Build the capability to protect programme outcomes from day one with integrated cost, schedule, risk and governance control.",
                "ticker_items": ["Fully Funded Where Eligible", "Up to £27,000 Government Funding Band", "Capital Programme Baseline & Forecasting", "APM ChPP Readiness Support", "Build Internal Energy Controls Teams", "Book a 15-Minute Route-Fit Consultation"],
                "capability_tag": "Capital Capability",
                "capability_heading": "Develop Integrated Project Controls for Energy and Capital Programmes",
                "capability_body": "This route builds capital programme controls capability — from baseline management and integrated forecasting to contractor governance and regulatory assurance.",
                "capability_items": [
                    ("Baseline Control", "Rigorous baseline management and change control protecting programme integrity from initiation to close."),
                    ("Integrated Forecasting", "Earned value, variance analysis and integrated forecasting that gives leadership real programme confidence."),
                    ("Assurance Governance", "Reporting frameworks that satisfy internal governance, regulatory requirements and stakeholder expectations."),
                ],
                "problems_heading": "Energy and Capital Programme Challenges That Integrated Controls Solve",
                "problems_items": [
                    ("Capital Programme Complexity and Scale", "Multi-billion pound programmes with long lifecycles where small control gaps compound into major overruns."),
                    ("Safety and Regulatory Requirements", "Regulatory oversight demands audit-ready evidence and transparent reporting that weak controls cannot provide."),
                    ("Long Lead Times and Supply Chain Constraints", "Supplier delays and interface issues create knock-on effects across the entire programme timeline."),
                    ("Multi-Contractor Delivery Coordination", "Multiple contractors and interfaces create gaps in visibility and accountability that nobody owns."),
                    ("Risk Exposure Across Asset Lifecycles", "Risk and issues surfaced too late to influence key programme decisions — after the damage is already done."),
                    ("Cost Assurance Across Capital Spend", "Cost forecasts based on hope rather than earned value, variance analysis and evidence-based tracking."),
                ],
                "process_heading": "From Fragmented Controls to Integrated Programme Confidence",
                "process_body": "A pathway for building integrated cost, schedule and risk control across capital programmes.",
                "process_items": [
                    ("Integrate the Controls", "Manage cost, schedule and risk as one discipline with consistent frameworks and shared accountability."),
                    ("Forecast with Evidence", "Use earned value, variance analysis and forecast at completion to give leadership real programme confidence."),
                    ("Assure the Outcomes", "Build project controls designed for assurance from day one — satisfying regulatory and stakeholder requirements."),
                ],
                "stats_areas_label": "Core areas: Baseline, Forecast and Governance",
                "apprenticeship_body": "For eligible employers and learners in England. Suitable for energy project controllers, utilities planners, cost engineers and capital programme staff.",
                "who_for_heading": "Who Should Choose the Energy & Net Zero Route?",
                "professional_roles": ["Energy Project Controllers", "Utilities Planners", "Cost Engineers", "Risk Managers", "Commissioning Planners", "Capital Programme Staff", "Net Zero Programme Analysts", "Regulatory Reporting Leads"],
                "employer_needs": ["Stronger capital programme baseline control", "Integrated cost and schedule forecasting", "Regulatory assurance-ready reporting", "Contractor programme governance", "Internal energy controls capability", "Structured progression for capital teams"],
                "develop_heading": "Energy Capabilities Learners Develop",
                "develop_items": [
                    ("Baseline Control", "Rigorous baseline management protecting programme integrity across long lifecycles."),
                    ("Integrated Forecasting", "Earned value and variance analysis for real programme confidence."),
                    ("Risk & Change Management", "Structured risk frameworks for complex capital environments."),
                    ("Assurance Reporting", "Reporting frameworks satisfying regulatory and stakeholder expectations."),
                    ("Delivery Confidence", "Evidence-based forecasting reducing uncertainty in capital delivery."),
                    ("Capital Governance", "Governance structures giving senior leaders decision confidence."),
                ],
                "testimonials_heading": "Energy Project Controls in Practice",
                "testimonials": [
                    ("On a multi-billion-pound capital programme, the margin for error is razor-thin. The Energy PCP route gave our controls team the integrated capability we needed.", "Michael Okafor", "Programme Controls Director — Energy"),
                    ("The baseline management module changed how we approach programme integrity. Change control is now rigorous, not reactive.", "Capital Programme Manager", "Utilities Sector"),
                    ("Our regulatory reporting is now built into the controls process. Audit-ready evidence from day one, not a scramble before every review.", "Risk Manager", "Energy Infrastructure"),
                ],
                "case_study_title": "Building Integrated Controls for a Multi-Billion Capital Programme",
                "case_study_body": "How an energy employer used the Energy PCP Route to strengthen baseline governance and integrated forecasting.",
                "final_cta_heading": "Ready to Build Stronger Capital Programme Controls?",
                "consultation_heading": "Check your energy route eligibility or book a consultation",
                "consultation_body": "Tell us about your energy role, organisation and funding position. A member of our team will guide you to the most suitable route.",
                "faq_heading": "Energy & Net Zero PCP Route FAQs",
                "faqs": [
                    {"id": "tailored", "question": "Is this route tailored for energy and utilities?", "answer": "Yes. This Operational PCP route addresses the specific demands of energy, oil, gas, utilities and net zero programmes — capital programme complexity, safety requirements, multi-contractor delivery and regulatory oversight."},
                    {"id": "skills", "question": "What energy-specific project controls skills will I develop?", "answer": "Capital programme baseline management, integrated cost and schedule forecasting across long lifecycles, contractor programme control, outage and commissioning milestone management, and regulatory assurance reporting."},
                    {"id": "sectors", "question": "Which energy sectors does this cover?", "answer": "Oil and gas, renewable energy, nuclear, utilities (water, electricity, gas), net zero transition programmes, and energy infrastructure. Any capital-intensive energy programme where project controls maturity is critical."},
                    {"id": "net-zero", "question": "How does this support net zero programmes?", "answer": "Net zero programmes combine capital complexity with regulatory oversight and public accountability. This route builds the project controls capability needed to manage these programmes with confidence."},
                    {"id": "funded", "question": "Is this route fully funded?", "answer": "The Energy PCP Route is fully funded where eligible. For qualifying employers and learners in England, the Department for Education funding band is up to £27,000."},
                    {"id": "eligible-meaning", "question": "What does “Fully Funded Where Eligible” mean?", "answer": "Eligibility depends on the learner's place of work, employment status, role relevance and prior qualifications. Levy-paying employers get 100% coverage. Non-levy payers receive 95% government contribution."},
                    {"id": "delivery", "question": "How is the programme delivered?", "answer": "Delivery includes live online sessions (2 hours per week), guided reading, portfolio building, monthly one-to-one coaching and tripartite progress reviews every 10 weeks."},
                    {"id": "cohorts", "question": "Can employers enrol multiple learners?", "answer": "Yes. Many employers enrol cohorts across project controls, planning and risk functions. Group delivery can be arranged for organisations building controls capability at scale."},
                ],
            },
        }

    def chartered_pmo_pathway_faqs(self):
        return [
            {"id": "funded", "question": "Can the Chartered Pathway be fully funded?", "answer": "Potentially, where the learner, employer and programme meet the applicable apprenticeship funding requirements. Funding is subject to employer eligibility, learner suitability, residency, employment status, working location and government funding rules."},
            {"id": "commercial", "question": "Is Commercial Access available?", "answer": "Yes. Commercial Access provides a more direct way to join the same Chartered Pathway without apprenticeship funding requirements, off-the-job evidence logs or progress reviews. It includes assignment-based assessment, certificate outcomes and flexible delivery discussions."},
            {"id": "chpp-guarantee", "question": "Does the pathway automatically award ChPP?", "answer": "No. ChPP is awarded solely by APM after the candidate meets the applicable professional practice, CPD, ethics and assessment requirements. Completion does not automatically confer Chartered Project Professional status."},
            {"id": "catalogue", "question": "Can I download the programme catalogue?", "answer": "Yes. The Chartered Pathway Catalogue explains the structure, modules, assessment, funding, APM recognition and application process. It is available as a PDF download from the hero section and the pathway structure section of this page."},
        ]

    def chartered_pmo_pathway_sections(self):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Project Controls Professional Level 6",
                    "title": "Fully Funded Chartered Pathway",
                    "titleAccent": "for PMO & Project Controls Professionals",
                    "body": "Build the capability behind chartered project leadership. Develop advanced capability across PMO governance, project planning and control, risk, quality, stakeholder communication and responsible AI through a focused six-credit Level 6 pathway.",
                    "secondaryBody": "Start with the module that matters most to your career — from £4,000 per module, with the flexibility to build towards the complete six-credit Chartered Pathway.",
                    "tagline": "APM Recognised · Fully Funded Where Eligible · 6 Credits Level 6",
                    "primaryCta": {"label": "Book Info Session", "url": "#enquiry-form"},
                    "secondaryCta": {"label": "Book 1 to 1 Consulting", "url": "#enquiry-form"},
                    "tertiaryLink": {"label": "Download the Chartered Pathway Catalogue", "url": "/Certified_PMO_Professional_Level_6_Programme_Catalogue.pdf"},
                },
            },
            {
                "name": "Trust bar", "type": SectionType.LOGO_MARQUEE,
                "content": {
                    "label": "Trusted by",
                    "items": [{"id": slug, "name": name} for slug, name in [
                        ("apm", "Association for Project Management"), ("ipc", "Institute of Project Controls"),
                        ("kbc", "Kent Business College"), ("casa", "CaSA Cost Engineers"),
                        ("balfour", "Balfour Beatty"), ("skanska", "Skanska"), ("jacobs", "Jacobs"), ("wsp", "WSP"),
                    ]],
                },
            },
            {
                "name": "Facts strip", "type": SectionType.LOGO_MARQUEE,
                "content": {
                    "label": "Pathway facts",
                    "items": [{"id": f"fact-{i}", "name": label} for i, label in enumerate([
                        "6 Credits", "Fully Funded Where Eligible", "APM Recognised Assessment", "Employer-Supported",
                        "Workplace-Applied", "Live Online Learning", "Commercial Access Available",
                    ])],
                },
            },
            {
                "name": "Pathway structure", "type": SectionType.CARD_GRID, "anchor": "pathway-structure",
                "content": {
                    "tag": "Pathway Structure",
                    "heading": "One Chartered Pathway. Six Focused Credits.",
                    "body": "A connected pathway that builds technical capability, professional judgement, workplace evidence and readiness for recognised progression. 4 Certified PMO credits + 1 AI credit + 1 chosen elective = 6 credits.",
                    "items": [
                        {
                            "id": "pmo", "title": "Certified PMO Professional Level 6", "meta": "4 Credits",
                            "body": "Four modules building advanced governance, controls, risk, quality and stakeholder leadership capability. 16 months · 4 modules, 4 months each · 2 hours live online weekly.",
                            "includes": ["Project Planning and Control", "Stakeholder Engagement and Communication", "Risk, Quality and Issue Management", "Project Management Office"],
                        },
                        {
                            "id": "ai", "title": "AI in Project Controls", "meta": "1 Credit",
                            "body": "Build responsible AI workflows, dashboards, automation and governed agents using practical project controls data. 4 months · 14 live practical sessions · 28 live learning hours.",
                            "includes": ["Responsible AI workflows", "Project controls dashboards", "Automated reporting", "Governed AI agents", "Data models", "Human-in-the-loop approval"],
                        },
                        {
                            "id": "elective", "title": "Choose One Specialist Elective", "meta": "1 Credit",
                            "body": "Choose one elective based on your professional role, employer requirements and progression goals. Both lead to an APMG credential, subject to the confirmed enrolment offer.",
                            "includes": ["Portfolio Management — APMG", "Earned Value Management — APMG"],
                            "cta": {"label": "Discuss My Chartered Pathway", "url": "#enquiry-form"},
                        },
                    ],
                },
            },
            {
                "name": "Funding your pathway", "type": SectionType.CARD_GRID, "variant": "programme", "anchor": "access-options",
                "content": {
                    "tag": "Funding Your Pathway",
                    "heading": "Two Ways to Access the Same Chartered Pathway",
                    "body": "Kent Business College supports your funding journey — whether through an eligible employer apprenticeship arrangement or direct commercial access. Both routes deliver the same Chartered Pathway experience.",
                    "items": [
                        {
                            "id": "funded", "badge": "Fully Funded Where Eligible", "highlighted": True, "ribbon": "Recommended",
                            "title": "Fully Funded Apprenticeship Access",
                            "body": "Kent Business College manages the apprenticeship funding process on your behalf — from employer eligibility checks and enrolment compliance to progress reviews and funding administration. This is a structured full six-credit programme; modules are not sold or selected individually.",
                            "includes": ["Potentially fully funded where eligible", "Employer-supported development", "Workplace application", "Professional evidence and portfolio", "Progress reviews", "Off-the-job learning records", "Apprenticeship compliance", "ChPP readiness support"],
                            "cta": {"label": "Check Fully Funded Eligibility", "url": "#enquiry-form"},
                        },
                        {
                            "id": "commercial", "badge": "Direct Access",
                            "title": "Commercial Access",
                            "body": "Ideal for professionals or employers who want the Chartered Pathway without apprenticeship funding requirements. Enrol in a single module that matters most to your career now, or commit to the full six-credit pathway from the start — at £4,000 per credit.",
                            "includes": ["Same Chartered Pathway learning", "Individual or employer purchase", "Assignment-based assessment", "Certificate outcomes", "Less apprenticeship administration", "No apprenticeship progress reviews", "No apprenticeship off-the-job evidence logs", "Flexible employer cohort discussions", "Weekend or agreed delivery options where available"],
                            "cta": {"label": "Explore Commercial Access", "url": "/commercial-project-controls-route"},
                        },
                    ],
                },
            },
            {
                "name": "Why the Chartered Pathway", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "The Case for Change",
                    "heading": "Why the Chartered Pathway",
                    "body": "Senior project environments do not need more data. They need professionals who can interpret information, improve governance and recommend action. Today, PMOs are often seen as administration with disconnected reporting, planning, risk and quality functions. The Chartered Pathway changes this — building strategic governance, integrated controls, earlier risk visibility and a structured route to ChPP readiness.",
                    "items": [
                        {"id": "governance", "title": "Strategic Governance", "body": "Strengthen decision rights, escalation routes, assurance routines and governance clarity across your projects."},
                        {"id": "controls", "title": "Integrated Controls", "body": "Connect scope, schedule, cost, risk, quality, issues and change into a single credible control environment."},
                        {"id": "risk-quality", "title": "Risk and Quality Confidence", "body": "Move from reactive risk registers to proactive risk ownership, quality assurance and continuous improvement."},
                        {"id": "stakeholder", "title": "Stakeholder Leadership", "body": "Translate complex project information into clear executive reporting, options and actionable recommendations."},
                    ],
                },
            },
            {
                "name": "APM recognition", "type": SectionType.CARD_GRID, "anchor": "apm-recognition",
                "content": {
                    "tag": "Professional Recognition",
                    "heading": "APM Recognition at the Centre of the Chartered Pathway",
                    "body": "The Certified PMO Professional Level 6 component is recognised as a technical-knowledge assessment for ChPP Pathway 2, subject to current APM requirements. Important: completion does not automatically confer ChPP. Chartered Project Professional status is awarded solely by APM after the candidate meets the applicable professional practice, CPD, ethics and assessment requirements.",
                    "items": [
                        {"id": "step-1", "title": "Complete the four PMO modules", "meta": "Step 1", "body": "Build governance, controls, risk, quality and stakeholder capability through structured workplace learning."},
                        {"id": "step-2", "title": "Organise professional evidence", "meta": "Step 2", "body": "Compile workplace outputs, portfolio evidence and reflective commentary aligned to APM requirements."},
                        {"id": "step-3", "title": "Complete a readiness review", "meta": "Step 3", "body": "Receive support to assess readiness for the ChPP application and identify any evidence gaps."},
                        {"id": "step-4", "title": "Apply to APM", "meta": "Step 4", "body": "Submit your application, recognised technical-knowledge evidence and supporting documentation to APM."},
                        {"id": "step-5", "title": "Complete the applicable APM assessment", "meta": "Step 5", "body": "Meet the professional practice, CPD, ethics and assessment requirements set by APM."},
                        {"id": "step-6", "title": "Achieve ChPP if the APM standard is met", "meta": "Step 6", "body": "Chartered Project Professional status is awarded solely by APM upon successful completion."},
                    ],
                },
            },
            {
                "name": "Expert authority", "type": SectionType.CARD_GRID,
                "content": {
                    "tag": "Expert Authority",
                    "heading": "Led by Recognised Project Controls Experts",
                    "body": "Each expert is connected to a specific area of the Chartered Pathway, ensuring authoritative guidance at every stage.",
                    "items": [
                        {"id": "ray-mead", "title": "Dr Ray Mead", "meta": "Certified PMO Professional Level 6", "body": "PMO Author and Project Leadership Expert. Focus: PMO governance, strategic alignment, project leadership capability."},
                        {"id": "stephen-jenner", "title": "Stephen Jenner", "meta": "Portfolio Management — APMG", "body": "Project Portfolio and Benefits Realisation Management Expert. Focus: Portfolio alignment, prioritisation, benefits realisation, investment decisions."},
                        {"id": "steve-wake", "title": "Steve Wake", "meta": "Earned Value Management — APMG", "body": "Earned Value Management Expert. Focus: CPI, SPI, variance analysis, forecasting, baseline control, evidence-based performance reporting."},
                    ],
                },
            },
            {
                "name": "Professional value", "type": SectionType.CARD_GRID, "anchor": "value",
                "content": {
                    "tag": "Professional Value",
                    "heading": "Professional Progression With Workplace Value",
                    "items": [
                        {"id": "learners", "title": "For Learners", "meta": "What you develop through this route", "includes": ["Advanced PMO capability", "Professional evidence portfolio", "Strategic communication", "Responsible AI capability", "APM-recognised technical knowledge", "Career progression into PMO, controls, portfolio and governance leadership"]},
                        {"id": "employers", "title": "For Employers", "meta": "What your organisation gains", "includes": ["More consistent governance", "More reliable plans and forecasts", "Earlier risk and issue visibility", "Decision-ready reporting", "Stronger stakeholder alignment", "Retention and succession"]},
                        {"id": "outcomes", "title": "Progression and Outcomes", "meta": "Flexible, employer-aligned, workplace-applied", "includes": ["Flexible Chartered Pathway", "Employer-Aligned Learning", "Workplace-Applied Development", "Professional Progression", "APM-Recognised Technical Knowledge"]},
                        {"id": "pcp-level-6", "title": "Project Controls Professional Level 6", "body": "Complete a structured Level 6 professional pathway focused on advanced PMO, governance, integrated controls, risk, quality, communication and professional application."},
                        {"id": "ipc-progression", "title": "Institute of Project Controls Progression", "body": "Support progression towards Institute of Project Controls professional recognition and Fellowship where the applicable requirements are met."},
                        {"id": "casa-progression", "title": "CaSA Incorporated Cost Engineer Progression", "body": "Support professional progression towards CaSA Incorporated Cost Engineer status where the learner meets the relevant external requirements."},
                        {"id": "chpp-journey", "title": "APM Chartered Project Professional Journey", "body": "The Chartered Pathway contains an APM-recognised technical-knowledge assessment supporting ChPP Pathway 2 progression, subject to APM eligibility and current requirements."},
                        {"id": "level-7", "title": "Optional Level 7 Enrichment", "body": "An optional Level 7 Diploma in Strategy and Leadership may support broader strategic and leadership development, subject to the learner's confirmed offer."},
                    ],
                },
            },
            {
                "name": "Included programme benefits", "type": SectionType.CARD_GRID,
                "content": {
                    "tag": "Included Value",
                    "heading": "More Than a Programme. A Complete Professional Development Experience.",
                    "body": "The Chartered Pathway is designed to support learning, professional progression, workplace application and the wider learner experience. Important: events, healthcare, exams, memberships, tutoring and other inclusions are subject to eligibility, availability and the learner's confirmed written enrolment offer.",
                    "items": [
                        {"id": "masterclass", "title": "London Masterclass Events", "meta": "February, June and October", "body": "Join selected in-person professional learning and networking events in London, subject to the confirmed event calendar and learner package."},
                        {"id": "graduation", "title": "Graduation Ceremony", "meta": "Rochester Cathedral", "body": "Celebrate programme achievement through the Kent Business College graduation experience, subject to completion and confirmed ceremony arrangements."},
                        {"id": "healthcare", "title": "Private Healthcare", "meta": "During the programme", "body": "Private healthcare support may be included during the programme where specified in the learner's confirmed enrolment package."},
                        {"id": "exams", "title": "Professional Exams Covered", "meta": "Where applicable", "body": "Relevant professional examination costs may be included where confirmed as part of the selected pathway and written enrolment offer."},
                        {"id": "memberships", "title": "Professional Memberships", "meta": "Where applicable", "body": "Selected professional memberships may be supported where they form part of the confirmed programme package."},
                        {"id": "ipc-membership", "title": "Institute of Project Controls", "meta": "Free membership", "body": "Support professional engagement and progression through Institute of Project Controls membership where confirmed for the learner's pathway."},
                        {"id": "tutoring", "title": "One-to-One Tutoring", "meta": "Personal coaching", "body": "Receive focused academic, professional and developmental guidance to support progress, application and assessment."},
                        {"id": "workplace-evidence", "title": "Workplace Evidence Support", "meta": "Employer-aligned", "body": "Develop relevant, authentic and clearly explained workplace evidence with guidance on portfolio structure, reflection and confidentiality."},
                    ],
                },
            },
            {
                "name": "What professionals say", "type": SectionType.CARD_GRID,
                "content": {
                    "tag": "Verified Feedback",
                    "heading": "What Professionals Say About the Chartered Pathway",
                    "items": [
                        {"id": "david-chen", "title": "David Chen", "meta": "Level 6 Learner — Public Sector", "body": "The PMO Governance module completely changed how we manage portfolio reporting. Our stakeholders now get real-time visibility and the confidence in our numbers has transformed executive conversations."},
                        {"id": "aisha-patel", "title": "Aisha Patel", "meta": "Cost Engineer — Utilities Sector", "body": "Cost engineering and risk management modules were practical from day one. I applied lessons learned in the next sprint review and our integrated controls are now the benchmark across the programme."},
                        {"id": "emma-richardson", "title": "Emma Richardson", "meta": "Level 3 Graduate — Construction Sector", "body": "I moved from project admin to project controls in 18 months. The structured pathway gave me confidence to apply for senior roles and my employer could see the workplace impact."},
                        {"id": "priya-sharma", "title": "Priya Sharma", "meta": "Planning Manager — Infrastructure", "body": "Employer-funded apprenticeship meant I could study while earning. The ROI was clear within six months of completing the programme and my planning team now operates with a single source of truth."},
                        {"id": "sarah-mitchell", "title": "Sarah Mitchell", "meta": "Level 6 Learner — Energy Sector", "body": "The programme helped me connect project controls theory with real workplace reporting, planning and risk conversations. My governance reports are now decision-ready."},
                        {"id": "chartered-catalogue", "title": "Chartered Pathway Catalogue", "body": "Full programme overview — structure, modules, assessment, funding and application process.", "cta": {"label": "Download the Chartered Pathway Catalogue", "url": "/Certified_PMO_Professional_Level_6_Programme_Catalogue.pdf"}},
                        {"id": "ai-catalogue", "title": "AI in Project Controls Catalogue", "body": "Certificate catalogue — responsible AI workflows, tools, dashboards and governed agents.", "cta": {"label": "Download the AI in Project Controls Catalogue", "url": "/Kent_Business_College_AI_in_Project_Controls_Certificate_Catalogue.pdf"}},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Meet the people behind the programmes",
                    "body": "Join specialist Masterclasses, professional events, webinars and information sessions focused on Project Controls, project delivery and professional development.",
                    "items": [
                        {"id": "masterclass", "badge": "Project Controls Masterclass", "title": "Explore specialist Project Controls topics", "body": "Join practitioners to explore specialist Project Controls topics, masterclasses and professional discussions. Format: online.", "cta": {"label": "View Upcoming Events", "url": "#enquiry-form"}},
                        {"id": "info-session", "badge": "Information Session", "title": "Speak with the College", "body": "Join professional webinars and information sessions to speak with the College about programmes, specialist modules and employer development. Format: online.", "cta": {"label": "Book an Information Session", "url": "#enquiry-form"}},
                    ],
                },
            },
            {
                "name": "Enquiry form", "type": SectionType.LEAD_FORM, "anchor": "enquiry-form",
                "content": {
                    "tag": "Get Started",
                    "heading": "Can Your Chartered Pathway Be Fully Funded?",
                    "body": "Tell us about your role and employer. We will help you understand apprenticeship eligibility, Commercial Access and the most suitable next step. No obligation — eligibility, route suitability and costs are confirmed before enrolment.",
                    "enquiryTypes": ["Check fully funded eligibility", "Download the catalogue", "Book a consultation", "Explore Commercial Access"],
                    "buttonLabel": "Check My Chartered Pathway Options",
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": "Chartered Pathway FAQs",
                    "items": self.chartered_pmo_pathway_faqs(),
                },
            },
        ]

    def apm_level_4_faqs(self):
        return [
            {"id": "who", "question": "Who is Associate Project Manager Level 4 designed for?", "answer": "It is designed for working professionals already involved in projects or taking on greater project responsibility — project coordinators, project officers, team leaders, delivery professionals and professionals adding Project Management capability alongside technical or operational experience."},
            {"id": "beginner", "question": "Do I need to already work in Project Management?", "answer": "You do not need a formal Project Management job title, but the programme is designed for people already working around projects rather than complete beginners. It builds on the experience you already have."},
            {"id": "learn", "question": "What will I learn?", "answer": "You will develop capability across project governance, leadership, Agile delivery, scope, cost, schedule, resources, risk, quality, procurement, stakeholder engagement and delivery — with practical AI applications where relevant."},
            {"id": "structure", "question": "How is the programme structured?", "answer": "The programme is built around four core areas: Project Governance & Leadership; Agile Project Management; Scope, Cost, Schedule & Resources; and Risk, Quality & Procurement. Detailed topics sit within these areas rather than as separate official modules."},
            {"id": "agile", "question": "How is Agile Project Management covered?", "answer": "Agile is covered through adaptive delivery, Agile principles, communication, leadership, stakeholder engagement and practical Agile application in real project environments."},
            {"id": "scope-cost-schedule", "question": "How are scope, cost and schedule covered?", "answer": "You will build understanding of scope definition, cost management, scheduling, resource planning, monitoring and project control — connecting planning to delivery outcomes."},
            {"id": "risk-quality-procurement", "question": "How are risk, quality and procurement covered?", "answer": "The programme covers project risk identification and response, quality management, procurement, contracts and the considerations that support professional project delivery."},
            {"id": "applied", "question": "How is learning applied to real project work?", "answer": "Learning is applied through real or approved project contexts. Examples of workplace application include a project plan, schedule, risk register, stakeholder map, status report, governance structure, cost information, procurement considerations and a project dashboard."},
            {"id": "ai-capability", "question": "What AI capability is included?", "answer": "The programme includes practical understanding of how AI-enabled tools can support project information, dashboards, workflows and decision-making — positioned as a professional-development enhancement, not a replacement for core Project Management."},
            {"id": "ai-dashboards", "question": "What are AI Dashboards?", "answer": "AI Dashboards are covered as using project information to create clearer visual reporting and decision support, helping professionals present project status and performance more effectively."},
            {"id": "ai-agents", "question": "How are AI Agents using n8n used?", "answer": "The programme explores practical workflow automation and AI-agent applications using n8n, relevant to project environments such as automating routine reporting and information flows."},
            {"id": "pmp-guarantee", "question": "Is PMP® automatically awarded?", "answer": "No. The programme provides PMP® preparation and examination support where included, but PMP® is awarded independently by PMI and remains subject to PMI's eligibility, examination and assessment requirements."},
            {"id": "pmp-prep", "question": "How does PMP® preparation work?", "answer": "Where included, PMP® preparation supports your understanding of Project Management knowledge and helps you prepare for the PMI examination. It does not guarantee a pass or automatic award."},
            {"id": "pathways", "question": "What professional qualification pathways are available?", "answer": "The programme connects Level 4 development with wider professional recognition, including PMI (Professional Body / Professional Certification) and APM (Professional Body / Qualification Pathway where applicable). External qualifications remain subject to the relevant body's requirements."},
            {"id": "fit-around-work", "question": "How does the programme fit around work?", "answer": "It is structured to fit alongside professional responsibilities, combining live professional learning, independent development and workplace application. Structured development designed to fit alongside professional responsibilities."},
            {"id": "support", "question": "What support is available?", "answer": "Support includes practitioner-led learning, learning resources, structured guidance, one-to-one support where included, and support outside live sessions where provided — alongside wellbeing, career and self-development tools."},
            {"id": "employer-cohorts", "question": "Can employers develop several employees?", "answer": "Yes. The programme can support multiple professionals at once, helping employers develop existing talent and build consistent project practice across teams."},
            {"id": "ipc-bursary", "question": "Is IPC bursary available for this programme?", "answer": "No. IPC commercial bursary support is for applicable Project Controls modules and should not be presented as funding for Associate Project Manager Level 4."},
            {"id": "consultation", "question": "Can I speak with the College before choosing?", "answer": "Absolutely. We encourage you to speak with the College about your responsibilities, professional goals and the development that best fits the work you do before committing."},
        ]

    def apm_level_4_sections(self):
        SectionType = PageSection.SectionType
        return [
            {
                "name": "Hero", "type": SectionType.HERO, "anchor": "hero",
                "content": {
                    "eyebrow": "Project Management · Level 4",
                    "title": "Build the capability to manage projects with greater confidence",
                    "body": "Professional Level 4 development for people taking on greater responsibility across project governance, planning, schedule, cost, risk, stakeholders and delivery.",
                    "secondaryBody": "Combine core Project Management capability with professional qualification preparation and practical AI applications for modern project work.",
                    "tagline": "For working professionals · Project teams · Employers · Delivery functions",
                    "primaryCta": {"label": "Explore the Programme", "url": "#value"},
                    "secondaryCta": {"label": "Book a Consultation", "url": "#consultation"},
                    "tertiaryLink": {"label": "Discuss this programme for your team", "url": "#employers"},
                },
            },
            {
                "name": "Programme value", "type": SectionType.FEATURE_GRID,
                "content": {
                    "tag": "Why This Programme",
                    "heading": "Move from supporting projects to managing delivery with greater confidence",
                    "body": "Projects require more than task coordination. Professionals need to understand governance, planning, resources, cost, schedule, risk, stakeholders and the decisions that keep delivery moving.",
                    "items": [
                        {"id": "from", "title": "From", "includes": ["Coordinating tasks", "Following plans", "Reporting issues", "Supporting meetings", "Working within individual project activities"]},
                        {"id": "to", "title": "To", "includes": ["Structuring delivery", "Managing plans and priorities", "Understanding cost and schedule", "Managing risk", "Engaging stakeholders", "Supporting stronger project decisions"]},
                    ],
                },
            },
            {
                "name": "Who this is for", "type": SectionType.FEATURE_GRID, "anchor": "who-for",
                "content": {
                    "tag": "Professional Fit",
                    "heading": "For professionals already working around projects",
                    "items": [
                        {"id": "coordinators", "title": "Project Coordinators & Project Officers", "body": "Build broader responsibility across planning, governance and delivery."},
                        {"id": "responsibility", "title": "Professionals Taking on Project Responsibility", "body": "Develop structured Project Management capability alongside existing technical or operational experience."},
                        {"id": "leaders", "title": "Team Leaders & Delivery Professionals", "body": "Strengthen project planning, stakeholder, risk and delivery capability."},
                        {"id": "employers", "title": "Employers Developing Existing Talent", "body": "Build Project Management capability around real organisational responsibilities."},
                    ],
                },
            },
            {
                "name": "Workplace capability", "type": SectionType.FEATURE_GRID, "anchor": "capability",
                "content": {
                    "tag": "Workplace Capability",
                    "heading": "Develop capability you can use on real projects",
                    "items": [
                        {"id": "govern", "title": "Govern", "body": "Understand roles, accountability, governance and project decision-making."},
                        {"id": "plan", "title": "Plan", "body": "Define scope, activities, resources and delivery priorities."},
                        {"id": "schedule", "title": "Schedule", "body": "Build and monitor realistic project schedules."},
                        {"id": "cost", "title": "Control Cost", "body": "Understand budgeting, cost tracking and project financial control."},
                        {"id": "risk", "title": "Manage Risk", "body": "Identify, assess and respond to uncertainty."},
                        {"id": "quality", "title": "Manage Quality", "body": "Maintain appropriate project quality requirements."},
                        {"id": "procure", "title": "Procure", "body": "Understand procurement, supplier and contract considerations."},
                        {"id": "engage", "title": "Engage", "body": "Communicate effectively with stakeholders and project teams."},
                        {"id": "lead", "title": "Lead", "body": "Build stronger project leadership and team-management capability."},
                        {"id": "deliver", "title": "Deliver", "body": "Connect planning and controls to successful project outcomes."},
                    ],
                },
            },
            {
                "name": "Programme structure", "type": SectionType.CARD_GRID, "anchor": "structure",
                "content": {
                    "tag": "What You Study",
                    "heading": "Build Project Management capability progressively",
                    "body": "Detailed topics appear within these areas and are not presented as separate official programme modules.",
                    "items": [
                        {"id": "governance-leadership", "title": "Project Governance & Leadership", "meta": "01", "includes": ["Roles", "Responsibilities", "Decision-making", "Leadership", "Stakeholder communication", "Project governance"]},
                        {"id": "agile", "title": "Agile Project Management", "meta": "02", "includes": ["Adaptive delivery", "Agile principles", "Communication", "Leadership", "Stakeholder engagement", "Practical Agile application"]},
                        {"id": "scope-cost-schedule", "title": "Scope, Cost, Schedule & Resources", "meta": "03", "includes": ["Scope", "Cost", "Schedule", "Resources", "Planning", "Monitoring", "Project control"]},
                        {"id": "risk-quality-procurement", "title": "Risk, Quality & Procurement", "meta": "04", "includes": ["Project risk", "Quality management", "Procurement", "Contracts", "Professional project delivery"]},
                    ],
                },
            },
            {
                "name": "Project Management and practical AI", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern", "anchor": "ai",
                "content": {
                    "tag": "Project Management + Practical AI",
                    "heading": "Develop Project Management capability for a changing delivery environment",
                    "body": "Alongside core Project Management development, professionals can build practical understanding of how AI-enabled tools can support project information, dashboards, workflows and decision-making. These are College professional-development enhancements — they do not replace core Project Management knowledge and do not imply AI certification or outcomes.",
                    "items": [
                        {"id": "dashboards", "title": "AI Dashboards Development & Design", "body": "Use project information to create clearer visual reporting and decision support."},
                        {"id": "agents", "title": "AI Agents Using n8n", "body": "Explore practical workflow automation and AI-agent applications relevant to project environments."},
                    ],
                },
            },
            {
                "name": "Qualification pathway", "type": SectionType.CARD_GRID, "anchor": "qualification",
                "content": {
                    "tag": "Professional Development",
                    "heading": "Connect Level 4 development with wider professional recognition",
                    "body": "Professional qualifications remain subject to the eligibility, examination and assessment requirements of the relevant professional body. Completing the programme does not automatically award PMP®, CAPM, PMQ or any other professional credential.",
                    "items": [
                        {"id": "level-4", "title": "Core Project Management Development", "meta": "Level 4 Programme", "body": "Structured development across governance, planning, schedule, cost, risk, quality, procurement, stakeholders and delivery."},
                        {"id": "pmp", "title": "PMP® Preparation & Examination Support", "meta": "Professional Qualification Preparation", "body": "Relevant PMP® professional qualification preparation where included and approved. PMP® is not automatically awarded."},
                        {"id": "practice", "title": "Apply Capability to Real Project Work", "meta": "Professional Practice", "body": "Use tools, frameworks and techniques in real or approved project contexts to build professional evidence."},
                    ],
                },
            },
            {
                "name": "Applied learning", "type": SectionType.CARD_GRID, "anchor": "applied",
                "content": {
                    "tag": "Applied Professional Development",
                    "heading": "Learn it. Apply it. Improve how projects are delivered.",
                    "items": [
                        {"id": "learn", "title": "Learn"},
                        {"id": "apply", "title": "Apply to Project Work"},
                        {"id": "review", "title": "Review with Practitioners"},
                        {"id": "evidence", "title": "Build Professional Evidence"},
                        {"id": "reflect", "title": "Reflect"},
                        {"id": "develop", "title": "Develop Further"},
                        {"id": "examples", "title": "Examples of Workplace Application", "body": "Presented as examples of how learning can be applied — not as mandatory artefacts.", "includes": ["Project plan", "Schedule", "Risk register", "Stakeholder map", "Project status report", "Governance structure", "Cost information", "Procurement considerations", "Project dashboard"]},
                    ],
                },
            },
            {
                "name": "Designed around work", "type": SectionType.FEATURE_GRID, "anchor": "work",
                "content": {
                    "tag": "Designed Around Work",
                    "heading": "Structured for working professionals",
                    "body": "The programme combines live professional learning with workplace application, so development fits alongside your existing responsibilities rather than sitting separately from them. “Structured development designed to fit alongside professional responsibilities.”",
                    "items": [
                        {"id": "live-learning", "title": "Live Professional Learning"},
                        {"id": "recordings", "title": "Recordings Where Provided"},
                        {"id": "independent", "title": "Independent Development"},
                        {"id": "workplace", "title": "Workplace Application"},
                        {"id": "practitioner-support", "title": "Practitioner Support"},
                        {"id": "reflection", "title": "Reflection"},
                    ],
                },
            },
            {
                "name": "Why the College", "type": SectionType.CARD_GRID, "anchor": "college",
                "content": {
                    "tag": "The College Experience",
                    "heading": "More than professional training",
                    "body": "The College combines project-management development with professional support, wellbeing, self-development, recognition and opportunities to engage with the wider profession. Benefits shown where approved for this commercial programme.",
                    "items": [
                        {"id": "support", "title": "Professional Support", "includes": ["Practitioner-led learning", "Learning resources", "Structured guidance", "One-to-one support where included", "Support outside live sessions where provided"]},
                        {"id": "wellbeing", "title": "Wellbeing", "includes": ["Private healthcare where included", "Mental wellbeing support", "Wellbeing assessment tools", "Inclusiveness support", "Optional learning-support assessment"]},
                        {"id": "career", "title": "Career & Self-Development", "includes": ["Personality-traits assessment", "RAISEC career-interest assessment", "Career / job-fit tools", "Personal-development dashboards", "Professional-direction guidance"]},
                        {"id": "recognition", "title": "Professional Recognition", "includes": ["Relevant professional membership support", "Professional qualification preparation", "Exam support where included", "Professional progression guidance"]},
                        {"id": "events", "title": "Masterclasses & Events", "includes": ["London Masterclasses where applicable", "Project Management events", "Professional workshops", "Information sessions"]},
                        {"id": "community", "title": "Professional Community", "includes": ["Professional clubs", "Networking", "Employer events", "Practitioner interaction"]},
                    ],
                },
            },
            {
                "name": "Practitioners", "type": SectionType.CARD_GRID, "anchor": "practitioners",
                "content": {
                    "tag": "Practitioner-Led",
                    "heading": "Learn from people who understand project delivery",
                    "items": [
                        {"id": "wake", "title": "Steven Wake", "meta": "Earned Value Management Specialist", "body": "Project Controls · Earned Value"},
                        {"id": "jenner", "title": "Stephen Jenner", "meta": "Portfolio & Benefits Specialist", "body": "Governance · Benefits · Portfolio"},
                        {"id": "badewi", "title": "Dr Amgad Badewi", "meta": "Project Management Specialist", "body": "Project Management · Professional Development"},
                        {"id": "mead", "title": "Ray Mead", "meta": "PMO & Governance Specialist", "body": "PMO · Governance · Transformation"},
                        {"id": "millington", "title": "Andrew Millington", "meta": "Complex Programmes Specialist", "body": "Complex Programmes · Capability Development"},
                    ],
                },
            },
            {
                "name": "For employers", "type": SectionType.FEATURE_GRID, "variant": "dark-pattern", "anchor": "employers",
                "content": {
                    "tag": "For Employers",
                    "heading": "Develop stronger project capability inside your organisation",
                    "body": "Build on the experience already inside your organisation by developing professionals who coordinate, support or increasingly manage projects. Develop the capability your project environment actually needs.",
                    "items": [
                        {"id": "talent", "title": "Develop Existing Talent", "body": "Strengthen professionals already working around projects."},
                        {"id": "practice", "title": "Build Consistent Practice", "body": "Create stronger approaches to governance, planning, risk and reporting."},
                        {"id": "connect", "title": "Connect Learning to Work", "body": "Apply development directly to current projects."},
                        {"id": "responsibility", "title": "Develop Greater Responsibility", "body": "Support professionals as their project responsibilities grow."},
                        {"id": "digital", "title": "Build Digital Capability", "body": "Introduce practical AI applications alongside strong Project Management fundamentals."},
                    ],
                },
            },
            {
                "name": "Programme access", "type": SectionType.CARD_GRID, "anchor": "access",
                "content": {
                    "tag": "Programme Access",
                    "heading": "Discuss the right development option for you or your team",
                    "body": "Talk to the College about programme format, professional qualification support, commercial fees and the development appropriate to your responsibilities. This is a commercial programme — IPC scholarships and bursaries are not available for Associate Project Manager Level 4; they apply only to eligible Project Controls modules.",
                    "items": [
                        {"id": "information", "title": "Request Programme Information", "cta": {"label": "Request Information", "url": "#consultation"}},
                        {"id": "commercial", "title": "Discuss Commercial Development", "cta": {"label": "Discuss Commercial Development", "url": "#consultation"}},
                    ],
                },
            },
            {
                "name": "Professional recognition", "type": SectionType.CARD_GRID, "anchor": "recognition",
                "content": {
                    "tag": "Professional Recognition & Pathways",
                    "heading": "Development connected to recognised Project Management practice",
                    "body": "Professional-body relationships are described accurately and are not presented as institutional accreditation. Professional qualifications remain subject to the relevant body's eligibility, examination and assessment requirements.",
                    "items": [
                        {"id": "pmi", "title": "PMI", "body": "Professional Body · Professional Certification"},
                        {"id": "apm", "title": "APM", "body": "Professional Body · Qualification Pathway where applicable"},
                    ],
                },
            },
            {
                "name": "Professional direction", "type": SectionType.FEATURE_GRID, "anchor": "direction",
                "content": {
                    "tag": "What Comes Next",
                    "heading": "Build from project support towards greater delivery responsibility",
                    "body": "Typical professional directions — not guaranteed job outcomes. Associate Project Manager Level 4 can support progression towards advanced Project Management or Project Controls development, but does not guarantee progression into a particular role.",
                    "items": [
                        {"id": "support", "title": "Project Support"},
                        {"id": "coordination", "title": "Project Coordination"},
                        {"id": "responsibility", "title": "Project Management Responsibility"},
                        {"id": "complex", "title": "Broader / More Complex Project Delivery"},
                        {"id": "further", "title": "Further Professional Development"},
                    ],
                },
            },
            {
                "name": "What professionals and employers say", "type": SectionType.CARD_GRID,
                "content": {
                    "tag": "Professional Experience",
                    "heading": "What professionals and employers say",
                    "items": [
                        {"id": "project-officer", "title": "Project Officer", "meta": "Professional Services", "body": "The programme helped me move from coordinating tasks to genuinely managing delivery. I understand governance, risk and reporting in a way I simply didn't before."},
                        {"id": "delivery-lead", "title": "Delivery Lead", "meta": "Engineering", "body": "Being able to apply what I learned directly to my live projects made the development immediately useful — not just theory."},
                        {"id": "employer", "title": "Employer", "meta": "Delivery Organisation", "body": "We used the programme to build consistent project practice across our team. The workplace focus made adoption far easier."},
                    ],
                },
            },
            {
                "name": "Events and masterclasses", "type": SectionType.CARD_GRID, "anchor": "events",
                "content": {
                    "tag": "Events & Masterclasses",
                    "heading": "Explore the programme before you commit",
                    "items": [
                        {"id": "info-session", "badge": "Programme Information Session", "title": "Introduction to Associate Project Manager Level 4", "body": "First Thursday of each month · College Admissions Team · Live Online · Zoom"},
                        {"id": "masterclass", "badge": "Project Management Masterclass", "title": "Planning, Schedule and Delivery Confidence", "body": "Quarterly · College Practitioner Team · In-Person / Online Hybrid · College of Project Controls, London"},
                        {"id": "ai-projects", "badge": "AI in Projects", "title": "Practical AI Applications for Project Work", "body": "Bi-monthly · College Digital Delivery Specialists · Live Online · Zoom"},
                        {"id": "employer-session", "badge": "Employer Session", "title": "Building Project Capability Across Teams", "body": "On request · College Employer Relations Team · Live Online / Bespoke · Virtual or On-Site"},
                    ],
                },
            },
            {
                "name": "Frequently asked questions", "type": SectionType.FAQ, "anchor": "faq",
                "content": {
                    "heading": "Associate Project Manager Level 4, clearly explained",
                    "items": self.apm_level_4_faqs(),
                },
            },
            {
                "name": "Consultation", "type": SectionType.LEAD_FORM, "anchor": "consultation",
                "content": {
                    "tag": "Your Next Step",
                    "heading": "Ready to build stronger Project Management capability?",
                    "body": "Talk to the College about your responsibilities, professional goals and the development that best fits the work you do.",
                    "enquiryTypes": ["Programme information", "Employer team development", "Professional qualification support", "General enquiry"],
                    "buttonLabel": "Discuss My Development",
                },
            },
        ]

    def handle(self, *args, **options):
        self.add_page(
            "programmes",
            "Professional programmes",
            "Compare complete professional programmes, specialist modules and development pathways.",
            [
                self.hero(
                    "Professional programmes",
                    "Choose development built around",
                    "real responsibility",
                    "Compare Project Controls, Project Management and PMO pathways designed for working professionals and employers.",
                    "Compare programmes",
                ),
                {
                    "name": "Programme disciplines",
                    "type": PageSection.SectionType.CARD_GRID,
                    "content": {
                        "heading": "Three professional disciplines",
                        "body": "Start with the responsibility you hold and the capability you need to strengthen.",
                        "items": [
                            {"id": "controls", "title": "Project Controls", "body": "Planning, scheduling, cost, risk, change, reporting and integrated controls."},
                            {"id": "management", "title": "Project Management", "body": "Governance, stakeholders, delivery planning and applied project leadership."},
                            {"id": "pmo", "title": "PMO", "body": "Governance, assurance, integrated reporting and strategic decision support."},
                        ],
                    },
                },
                {
                    "name": "Programme catalogue",
                    "type": PageSection.SectionType.CARD_GRID,
                    "variant": "programme",
                    "content": {
                        "tag": "Choose your programme",
                        "heading": "Complete programmes for different levels of responsibility",
                        "body": "Each route connects structured learning with professional support and workplace application.",
                        "items": [
                            {"id": "pcp", "badge": "Level 6", "title": "Project Controls Professional", "body": "Advanced project controls capability.", "bestFor": "Planners, cost professionals, risk leads and controls managers.", "cta": {"label": "Explore PCP Level 6", "url": "/pcp-master"}},
                            {"id": "apm", "badge": "Level 4", "title": "Associate Project Manager", "body": "Applied project management development.", "bestFor": "Project coordinators, assistant project managers and delivery professionals.", "cta": {"label": "Explore APM Level 4", "url": "/associate-project-manager-level-4"}},
                            {"id": "pmo", "badge": "Level 6", "title": "Certified PMO Professional", "body": "Strategic PMO and governance capability.", "bestFor": "PMO professionals, governance leads and reporting managers.", "cta": {"label": "Explore PMO route", "url": "/pmo-pcp"}},
                        ],
                    },
                },
                self.faq([
                    {"id": "programme-module", "question": "What is the difference between a complete programme and a module?", "answer": "A programme develops a connected professional capability over time. A module targets one specialist subject."},
                    {"id": "choose", "question": "How do I choose?", "answer": "Start with your current responsibilities, development goal, preferred format and funding position."},
                ]),
                self.cta("Find the programme that fits your responsibilities", "Talk through your role, organisation and professional direction."),
            ],
        )

        self.add_page(
            "employers",
            "Employer capability development",
            "Build internal project controls, PMO and project management capability across your organisation.",
            [
                self.hero("For employers", "Build capability inside your organisation", "not dependency outside it", "Develop project controls, PMO and project management capability around real roles, live projects and measurable organisational needs.", "Build a capability plan"),
                {"name": "Employer outcomes", "type": PageSection.SectionType.FEATURE_GRID, "content": {"heading": "Turn development into organisational capability", "body": "Target the areas that matter most to delivery performance.", "items": [
                    {"id": "capability", "title": "Build Internal Capability", "body": "Develop controls and PMO expertise inside your team."},
                    {"id": "governance", "title": "Strengthen Governance", "body": "Improve assurance, escalation and reporting standards."},
                    {"id": "retain", "title": "Retain & Upskill Talent", "body": "Create visible professional progression for high-potential employees."},
                    {"id": "aligned", "title": "Workplace-Aligned Learning", "body": "Map development to live project deliverables."},
                    {"id": "decisions", "title": "Better Reporting & Decisions", "body": "Apply stronger planning, forecasting and performance insight."},
                    {"id": "funding", "title": "Use Funding Strategically", "body": "Turn levy or co-funding into measurable capability."},
                ]}},
                {"name": "Employer process", "type": PageSection.SectionType.CARD_GRID, "variant": "dark-pattern", "content": {"heading": "From capability gap to measurable impact", "items": [
                    {"id": "assess", "title": "01 — Consult & Assess", "body": "Review funding, team structure and capability gaps."},
                    {"id": "match", "title": "02 — Match Pathway", "body": "Select the right route and cohort structure."},
                    {"id": "onboard", "title": "03 — Onboard Cohort", "body": "Enrol learners and map evidence to work."},
                    {"id": "measure", "title": "04 — Deliver & Measure", "body": "Track progress, impact and PMO maturity."},
                    {"id": "scale", "title": "05 — Retain & Scale", "body": "Embed capability and repeat for the next cohort."},
                ]}},
                self.faq([
                    {"id": "teams", "question": "Can employers enrol a cohort?", "answer": "Yes. Cohorts can be aligned to organisational roles, projects and capability priorities."},
                    {"id": "funding", "question": "Can apprenticeship funding be used?", "answer": "Funding may be available where employer and learner eligibility requirements are met."},
                ]),
                self.cta("Build a capability plan for your team", "Discuss roles, funding, cohort size and the outcomes your organisation needs."),
            ],
        )

        self.add_page(
            "apprentices",
            "Professional development for working professionals",
            "Build project controls and project management capability through structured workplace learning.",
            [
                self.hero("For professionals", "Build capability that changes", "how you work", "Develop planning, cost, risk, PMO, governance and project-delivery capability while applying learning to real responsibilities.", "Find your route"),
                {"name": "Professional outcomes", "type": PageSection.SectionType.FEATURE_GRID, "content": {"heading": "Development designed around your working week", "items": [
                    {"id": "skills", "title": "Planning & Cost Skills", "body": "Build practical controls capability employers value."},
                    {"id": "evidence", "title": "Portfolio Evidence", "body": "Use real project deliverables rather than artificial case studies."},
                    {"id": "certification", "title": "Certification Pathways", "body": "Prepare for relevant professional recognition and examinations."},
                    {"id": "mentor", "title": "Dedicated Mentor", "body": "Receive one-to-one guidance from experienced practitioners."},
                    {"id": "classes", "title": "Masterclass Events", "body": "Connect learning with industry practice and professional networks."},
                    {"id": "flexible", "title": "Flexible Live Delivery", "body": "Study around work through interactive online sessions."},
                ]}},
                {"name": "Weekly rhythm", "type": PageSection.SectionType.CARD_GRID, "variant": "dark-pattern", "content": {"heading": "A weekly rhythm that connects learning and work", "items": [
                    {"id": "live", "title": "Live online session", "body": "Interactive tutor-led learning with your cohort."},
                    {"id": "study", "title": "Guided study", "body": "Explore concepts and apply them to your role."},
                    {"id": "mentor", "title": "Mentor check-in", "body": "Review progress and workplace application."},
                    {"id": "portfolio", "title": "Portfolio & reflection", "body": "Document evidence and professional learning."},
                ]}},
                self.faq([
                    {"id": "eligible", "question": "Am I eligible?", "answer": "Eligibility depends on employment, location, role relevance and prior learning."},
                    {"id": "delivery", "question": "How is learning delivered?", "answer": "Through live online sessions, guided study, workplace application, mentoring and progress reviews."},
                ]),
                self.cta("Find the right professional pathway", "Tell us about your role, experience and development goals.", "Check my route"),
            ],
        )

        self.add_page(
            "associate-project-manager-level-4",
            "Associate Project Manager Level 4",
            "A Level 4 professional development programme for working professionals building Project Management capability across governance, planning, schedule, cost, risk, quality, procurement, stakeholders and delivery, with professional qualification preparation and practical AI applications.",
            self.apm_level_4_sections(),
        )

        self.add_page(
            "pcp-master",
            "Project Controls Professional Level 6",
            "Advanced Level 6 professional development across planning, scheduling, Earned Value, risk, PMO and governance, with three professional routes: Operational, Strategic and Chartered.",
            self.pcp_master_sections(),
        )

        self.add_page(
            "strategic-pcp",
            "Strategic Project Controls Route",
            "A fully funded Level 6 Strategic Project Controls Professional route for PMO leaders, governance leads and project professionals, building executive reporting, governance and decision-support capability.",
            self.strategic_pcp_sections(),
        )

        self.add_page(
            "operational-pcp",
            "Operational Project Controls Route",
            "A fully funded Level 6 pathway for planners, schedulers, cost engineers, risk analysts and PMO analysts, building hands-on planning, cost control, risk management and reporting capability.",
            self.operational_pcp_sections(),
        )

        self.add_page(
            "strategic-operational-pcp",
            "Strategic + Operational Project Controls Route",
            "A premium combined Level 6 pathway with OTHM Level 7 Diploma progression, building both hands-on project controls skills and strategic leadership capability.",
            self.strategic_operational_pcp_sections(),
        )

        self.add_page(
            "pmo-pcp",
            "PMO Route — Build a PMO That Leaders Trust",
            "A Project Controls Professional Level 6 apprenticeship route for PMO, governance and reporting professionals, building governance confidence, integrated controls and APM-recognised progression.",
            self.pmo_pcp_sections(),
        )

        self.add_page(
            "chartered-pmo-pathway",
            "Chartered Pathway — PMO & Project Controls",
            "A focused six-credit Level 6 pathway combining Certified PMO Professional Level 6, AI in Project Controls and one specialist elective, with APM-recognised technical-knowledge assessment for ChPP Pathway 2.",
            self.chartered_pmo_pathway_sections(),
        )

        for slug, cfg in self.sector_route_configs().items():
            self.add_page(slug, cfg["page_title"], cfg["page_description"], self.sector_route_sections(cfg))

        self.add_page(
            "route-finder",
            "Project Controls route finder",
            "Compare funding and programme options based on your role, employer and development goals.",
            [
                self.hero("Route finder", "Find the route that fits", "your responsibilities", "Start with your current role, employer situation and the capability you want to build.", "Start route check"),
                {"name": "Route finder", "type": PageSection.SectionType.FUNDING_CALCULATOR, "anchor": "finder", "content": {
                    "heading": "Compare your likely access route",
                    "body": "Choose an employer situation and programme family for an indicative next step.",
                    "defaultResult": "A funded or commercial pathway may be available after a role and eligibility review.",
                    "disclaimer": "Results are indicative. Funding and programme acceptance are subject to current rules, role relevance and availability.",
                    "employerOptions": [
                        {"id": "levy", "label": "Levy-paying employer", "description": "Employer apprenticeship account", "result": "Apprenticeship funding may cover the applicable funding band, subject to eligibility."},
                        {"id": "sme", "label": "Non-levy employer", "description": "SME or smaller organisation", "result": "Government co-investment may be available, subject to current rules."},
                        {"id": "self", "label": "Self-funded professional", "description": "Direct commercial access", "result": "A commercial programme or specialist-module route is likely to be the relevant option."},
                        {"id": "unsure", "label": "Not sure", "description": "Review with an adviser", "result": "Book a route-fit consultation to confirm your employer and funding position."},
                    ],
                    "programmeOptions": [
                        {"id": "apm", "label": "Project Management Level 4", "description": "Broader project-delivery responsibility"},
                        {"id": "pcp", "label": "Project Controls Level 6", "description": "Planning, cost, risk and controls"},
                        {"id": "pmo", "label": "PMO Level 6", "description": "Governance, assurance and reporting"},
                        {"id": "modules", "label": "Specialist modules", "description": "Targeted professional development"},
                    ],
                }},
                self.cta("Confirm your route with an adviser", "A short consultation can validate role fit, eligibility and the best next step."),
            ],
        )

        self.add_page(
            "knowledge-hub",
            "Project Controls knowledge hub",
            "Practical guidance for employers and professionals across project controls, PMO and funding.",
            [
                self.hero("Knowledge hub", "Insight for better", "project decisions", "Explore practical guidance on project controls capability, PMO governance, professional pathways and funding.", "Explore insights"),
                {"name": "Featured insight", "type": PageSection.SectionType.MEDIA_COPY, "content": {"heading": "What is a Project Controls Professional apprenticeship?", "body": "Understand the responsibilities, capability areas, funding model and workplace evidence involved in a Level 6 Project Controls pathway.", "cta": {"label": "Read the guide", "url": "/contact"}}},
                {"name": "Insight library", "type": PageSection.SectionType.CARD_GRID, "content": {"heading": "Guidance for employers and professionals", "items": [
                    {"id": "funding", "eyebrow": "Employer guide", "title": "Fully funded Project Controls development", "body": "How levy and co-investment routes work where eligibility rules are met."},
                    {"id": "pmp", "eyebrow": "Comparison", "title": "Project Controls Level 6 vs PMP", "body": "Compare scope, workplace application and professional outcomes."},
                    {"id": "chpp", "eyebrow": "Professional recognition", "title": "APM ChPP readiness support", "body": "Understand readiness, evidence and independent assessment."},
                    {"id": "strategic", "eyebrow": "Route guide", "title": "Strategic vs Operational Project Controls", "body": "Choose the route that matches current responsibility."},
                    {"id": "construction", "eyebrow": "Sector guide", "title": "Construction Project Controls training", "body": "Capability for complex programmes, NEC change and delivery assurance."},
                    {"id": "energy", "eyebrow": "Sector guide", "title": "Energy Project Controls training", "body": "Controls capability for capital-intensive and regulated environments."},
                    {"id": "pmo", "eyebrow": "PMO guide", "title": "PMO governance and reporting", "body": "Move from status collection to trusted decision support."},
                    {"id": "commercial", "eyebrow": "Access guide", "title": "Commercial professional-development routes", "body": "Direct-access options for non-eligible and self-funded learners."},
                ]}},
                self.cta("Need guidance for your situation?", "Discuss capability, funding and professional-pathway questions with an adviser."),
            ],
        )

        self.add_page(
            "testimonials",
            "Learner and employer stories",
            "Professional-development outcomes across project controls, PMO and project management.",
            [
                self.hero("Outcomes and experience", "See how capability", "changes real work", "Stories from learners and employers applying project controls and PMO development across complex environments.", "Discuss your goals"),
                {"name": "Outcome stories", "type": PageSection.SectionType.CARD_GRID, "content": {"heading": "Capability applied across organisations and sectors", "items": [
                    {"id": "pmo-sites", "title": "Building PMO Capability Across 12 Sites", "body": "A distributed employer team aligned governance, reporting and professional practice."},
                    {"id": "support-controls", "title": "From Project Support to Controls Team", "body": "Professionals progressed from coordination into planning, cost and controls responsibility."},
                    {"id": "energy", "title": "Energy Sector Controls Excellence", "body": "A capital-project team strengthened schedule, risk and performance visibility."},
                    {"id": "digital", "title": "Digital Transformation PMO", "body": "A PMO moved from status collection to evidence-based decision support."},
                    {"id": "engineering", "title": "Engineering Supply Chain Controls", "body": "Integrated controls improved supplier coordination and change visibility."},
                    {"id": "healthcare", "title": "Healthcare Capital Programme Controls", "body": "Governance and assurance strengthened across a complex public programme."},
                ]}},
                self.cta("Create the next capability story", "Build a route around your role, team or organisational priorities."),
            ],
        )

        self.add_page(
            "contact",
            "Contact the College",
            "Discuss programmes, specialist modules, funding, employer cohorts and professional pathways.",
            [
                self.hero("Start a conversation", "Tell us what capability", "you need to build", "Share your role, team situation or professional direction and an adviser will help identify the most relevant next step.", "Book a consultation"),
                {"name": "Ways to start", "type": PageSection.SectionType.CARD_GRID, "content": {"heading": "Choose the conversation you need", "items": [
                    {"id": "programme", "title": "Programme consultation", "body": "Compare complete programmes and access routes."},
                    {"id": "employer", "title": "Employer capability discussion", "body": "Review cohort, funding and organisational needs."},
                    {"id": "modules", "title": "Specialist development", "body": "Identify targeted modules around capability gaps."},
                    {"id": "eligibility", "title": "Funding eligibility", "body": "Clarify likely apprenticeship or commercial access."},
                ]}},
                {"name": "Contact form", "type": PageSection.SectionType.LEAD_FORM, "anchor": "contact-form", "content": {
                    "tag": "Contact the College",
                    "heading": "Start with your role, team or development goal",
                    "body": "Complete the form and an adviser will review the most relevant programme, specialist module, employer or funding conversation.",
                    "enquiryTypes": ["Programme consultation", "Employer capability", "Specialist modules", "Funding eligibility", "Events and masterclasses", "General enquiry"],
                    "buttonLabel": "Send my enquiry",
                }},
                self.faq([
                    {"id": "response", "question": "What happens after I contact the College?", "answer": "An adviser reviews your enquiry and arranges the most relevant programme, employer or eligibility conversation."},
                    {"id": "prepare", "question": "What information should I prepare?", "answer": "Your role, employer, main responsibilities, development goals and any funding questions."},
                ]),
            ],
        )

        self.stdout.write(self.style.SUCCESS("Seeded supporting pages from the project reference."))
