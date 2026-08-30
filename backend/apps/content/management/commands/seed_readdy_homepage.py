from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.content.models import (
    MenuItem,
    NavigationMenu,
    Page,
    PageSection,
    PublicationStatus,
    SiteSettings,
)


class Command(BaseCommand):
    help = "Create or refresh the editable homepage based on the supplied Readdy reference."

    def handle(self, *args, **options):
        settings = SiteSettings.load()
        settings.site_name = "College of Project Controls and Management"
        settings.logo_text = "College of Project Controls"
        settings.tagline = "Project controls and management"
        settings.primary_cta_label = "Find your programme"
        settings.primary_cta_url = "/route-finder"
        settings.footer_description = (
            "Professional project controls and project management pathways delivered by "
            "Kent Business College. Fully funded apprenticeship routes are available where eligible."
        )
        settings.copyright_name = "College of Project Controls and Management"
        settings.save()

        header, _ = NavigationMenu.objects.update_or_create(
            location=NavigationMenu.Location.HEADER,
            defaults={"name": "Main navigation", "is_active": True},
        )
        header.items.all().delete()
        for order, (label, url) in enumerate(
            [
                ("Programmes", "/#programmes"),
                ("Funding", "/#funding"),
                ("Employers", "/#employers"),
                ("Professionals", "/#professionals"),
                ("Sectors", "/#sectors"),
                ("FAQ", "/#faq"),
            ],
            start=1,
        ):
            MenuItem.objects.create(menu=header, label=label, url=url, order=order * 10)

        footer, _ = NavigationMenu.objects.update_or_create(
            location=NavigationMenu.Location.FOOTER_PRIMARY,
            defaults={"name": "Footer navigation", "is_active": True},
        )
        footer.items.all().delete()
        for order, (label, url) in enumerate(
            [
                ("Programmes", "/#programmes"),
                ("Book a consultation", "/contact"),
                ("Knowledge hub", "/knowledge-hub"),
                ("Route finder", "/route-finder"),
            ],
            start=1,
        ):
            MenuItem.objects.create(menu=footer, label=label, url=url, order=order * 10)

        page, _ = Page.objects.update_or_create(
            slug="home",
            defaults={
                "title": "College of Project Controls and Management",
                "navigation_title": "Home",
                "summary": "Professional pathways for employers, apprentices and working professionals.",
                "status": PublicationStatus.PUBLISHED,
                "is_homepage": True,
                "seo_title": "College of Project Controls and Management",
                "seo_description": (
                    "Build project controls, PMO, planning, cost, risk and governance capability "
                    "through structured professional pathways."
                ),
                "published_at": timezone.now(),
            },
        )

        Page.objects.filter(is_homepage=True).exclude(pk=page.pk).update(is_homepage=False)
        page.sections.all().delete()

        sections = [
            {
                "name": "Homepage hero",
                "type": PageSection.SectionType.HERO,
                "anchor": "home",
                "variant": "control-grid",
                "content": {
                    "eyebrow": "Fully funded where eligible",
                    "title": "The College for Project Controls and Project Management",
                    "body": (
                        "Build capability in project controls, PMO, planning, cost, risk, governance "
                        "and project delivery through structured apprenticeship and commercial pathways."
                    ),
                    "primaryCta": {"label": "Find your programme", "url": "/route-finder"},
                    "secondaryCta": {"label": "Book a one-to-one consultation", "url": "/contact"},
                    "stats": [
                        {"id": "employers", "value": "500+", "label": "Employers trained"},
                        {"id": "learners", "value": "2,000+", "label": "Learners enrolled"},
                        {"id": "completion", "value": "95%", "label": "Completion rate"},
                        {"id": "sectors", "value": "15+", "label": "Industry sectors"},
                    ],
                },
            },
            {
                "name": "Discipline marquee",
                "type": PageSection.SectionType.LOGO_MARQUEE,
                "content": {
                    "label": "Project controls capability",
                    "items": [
                        {"id": "planning", "name": "Planning & Scheduling"},
                        {"id": "cost", "name": "Cost Engineering"},
                        {"id": "risk", "name": "Risk Management"},
                        {"id": "pmo", "name": "PMO Governance"},
                        {"id": "data", "name": "Data & Reporting"},
                        {"id": "delivery", "name": "Project Delivery"},
                    ],
                },
            },
            {
                "name": "Programme pathways",
                "type": PageSection.SectionType.CARD_GRID,
                "anchor": "programmes",
                "variant": "control-pattern",
                "content": {
                    "heading": "Choose your programme",
                    "body": "Four pathways designed around your experience, role and career goals.",
                    "items": [
                        {
                            "id": "level-3",
                            "badge": "Foundation pathway",
                            "title": "Project Technician Level 3",
                            "meta": "1.5 years",
                            "body": "Start your project career with strong foundations.",
                            "bestFor": "Project assistants, junior planners and project coordinators.",
                            "includes": ["PMI CAPM or APM PFQ preparation", "Project technician core course", "AI in Project Controls foundation"],
                            "cta": {"label": "Explore Level 3", "url": "/project-technician-level-3"},
                        },
                        {
                            "id": "level-4",
                            "badge": "Mid-level pathway",
                            "title": "Associate Project Manager Level 4",
                            "meta": "1 year",
                            "body": "Build project management confidence and professional readiness.",
                            "bestFor": "Project coordinators, assistant project managers and team leaders.",
                            "includes": ["PMP preparation or APM PMQ route", "Employer-aligned learning", "Dedicated programme support"],
                            "cta": {"label": "Explore Level 4", "url": "/associate-project-manager-level-4"},
                        },
                        {
                            "id": "level-6",
                            "badge": "Advanced professional pathway",
                            "title": "Project Controls Professional Level 6",
                            "meta": "2 years",
                            "body": "Develop advanced project controls, PMO and governance capability.",
                            "bestFor": "Planners, schedulers, cost engineers, risk managers and PMO professionals.",
                            "includes": ["Operational project controls pathway", "Strategic PMO and governance", "APM ChPP pathway support"],
                            "cta": {"label": "Explore Level 6", "url": "/pcp-master"},
                        },
                        {
                            "id": "combined",
                            "badge": "Fast-track bundle",
                            "title": "Level 3 + Level 6 Combined",
                            "meta": "3 years total",
                            "body": "Move from foundation to professional in one structured journey.",
                            "bestFor": "Ambitious professionals seeking a complete progression pathway.",
                            "includes": ["Level 3 foundation", "Level 6 advanced pathway", "Dedicated mentor continuity"],
                            "cta": {"label": "Explore combined", "url": "/combined-pathway"},
                        },
                    ],
                },
            },
            {
                "name": "Funding calculator",
                "type": PageSection.SectionType.FUNDING_CALCULATOR,
                "anchor": "funding",
                "content": {
                    "eyebrow": "Funding calculator",
                    "heading": "Estimate your funding",
                    "body": "Select your employer type and programme to see an indicative funding route.",
                    "defaultResult": "A commercial or funded pathway may be available following an eligibility review.",
                    "disclaimer": "This result is indicative only. Funding depends on employer and learner eligibility, current funding rules and availability.",
                    "employerOptions": [
                        {"id": "levy", "label": "Large employer", "description": "Apprenticeship levy payer", "result": "Potentially 100% levy funded, subject to eligibility."},
                        {"id": "sme", "label": "Small employer", "description": "Under 50 employees", "result": "Up to 95% government co-investment may apply."},
                        {"id": "individual", "label": "Self-funded individual", "description": "Independent learner", "result": "A commercial route and payment options may be available."},
                        {"id": "unsure", "label": "Not sure", "description": "Speak with an adviser", "result": "Book an eligibility review for personalised guidance."},
                    ],
                    "programmeOptions": [
                        {"id": "l3", "label": "Level 3 Project Technician", "description": "Foundation", "duration": "Indicative duration: 1.5 years"},
                        {"id": "l4", "label": "Level 4 Associate PM", "description": "Associate", "duration": "Indicative duration: 1 year"},
                        {"id": "l6", "label": "Level 6 Project Controls", "description": "Professional", "duration": "Indicative duration: 2 years"},
                        {"id": "combined", "label": "Combined Level 3 + 6", "description": "Full pathway", "duration": "Indicative duration: 3 years"},
                    ],
                },
            },
            {
                "name": "Mentor team",
                "type": PageSection.SectionType.CARD_GRID,
                "anchor": "mentors",
                "content": {
                    "heading": "Meet the mentors",
                    "body": "Every learner is matched with a dedicated mentor who supports their programme journey.",
                    "items": [
                        {"id": "sarah", "eyebrow": "Lead programme mentor", "title": "Dr Sarah Mitchell", "meta": "Project Controls · PMO Governance · APM ChPP", "body": "Twenty years across major infrastructure and energy programmes, focused on developing controls leaders."},
                        {"id": "james", "eyebrow": "Senior controls adviser", "title": "James Okonkwo", "meta": "Cost Engineering · Risk · Planning", "body": "Former project controls director helping learners translate theory into practical delivery skills."},
                        {"id": "emma", "eyebrow": "Strategic PMO lead", "title": "Emma Richardson", "meta": "PMO Design · Governance · Stakeholders", "body": "Experienced in building PMO functions for large organisations and public sector programmes."},
                        {"id": "david", "eyebrow": "Technical skills coach", "title": "David Chen", "meta": "Scheduling · AI · Data Analytics", "body": "P6 and Primavera specialist supporting modern, data-informed project controls workflows."},
                    ],
                },
            },
            {
                "name": "For employers",
                "type": PageSection.SectionType.MEDIA_COPY,
                "anchor": "employers",
                "content": {
                    "heading": "Build project controls capability inside your team",
                    "body": "Develop employees who can improve planning, reporting, cost control, risk visibility and PMO maturity through employer-aligned learning.",
                    "cta": {"label": "Explore employer solutions", "url": "/employers"},
                },
            },
            {
                "name": "For professionals",
                "type": PageSection.SectionType.MEDIA_COPY,
                "anchor": "professionals",
                "variant": "reverse",
                "content": {
                    "heading": "Progress your career in project controls",
                    "body": "Build planning, cost, risk and reporting skills with structured mentorship, professional pathways and workplace-focused support.",
                    "cta": {"label": "Explore professional pathways", "url": "/apprentices"},
                },
            },
            {
                "name": "Professional experience",
                "type": PageSection.SectionType.FEATURE_GRID,
                "variant": "dark-pattern",
                "content": {
                    "heading": "More than a programme. A professional development experience.",
                    "body": "Support around the learner journey helps professionals progress and employers see workplace impact.",
                    "items": [
                        {"id": "classes", "title": "London masterclass events", "body": "Focused professional learning and peer connection."},
                        {"id": "graduation", "title": "Graduation ceremony", "body": "Recognising learner achievement and progression."},
                        {"id": "exams", "title": "Professional exams", "body": "Preparation and support where applicable."},
                        {"id": "memberships", "title": "Professional memberships", "body": "Pathway support where applicable."},
                        {"id": "tutoring", "title": "One-to-one tutoring", "body": "Personal coaching throughout the programme."},
                        {"id": "evidence", "title": "Workplace evidence support", "body": "Employer-aligned portfolio guidance."},
                    ],
                },
            },
            {
                "name": "Sector pathways",
                "type": PageSection.SectionType.CARD_GRID,
                "anchor": "sectors",
                "content": {
                    "heading": "Built for project-driven sectors",
                    "body": "Pathways designed around complex project environments and sector-specific controls challenges.",
                    "items": [
                        {"id": "construction", "title": "Construction, building and urban", "body": "Planning, scheduling, cost control, reporting and change management."},
                        {"id": "engineering", "title": "Engineering and manufacturing", "body": "Regulated delivery, supplier control, documentation and compliance reporting."},
                        {"id": "public", "title": "Public sector and councils", "body": "Value-for-money governance, accountability and public scrutiny."},
                        {"id": "energy", "title": "Energy, oil, gas and utilities", "body": "Capital programme risk, cost assurance and schedule assurance."},
                        {"id": "digital", "title": "Digital transformation and PMO", "body": "Digital delivery controls, PMO maturity and governance frameworks."},
                    ],
                },
            },
            {
                "name": "Learner voice",
                "type": PageSection.SectionType.TESTIMONIAL,
                "content": {
                    "quote": "The programme helped me connect project controls theory with real workplace reporting, planning and risk conversations.",
                    "name": "Sarah Mitchell",
                    "role": "Level 6 learner · Energy sector",
                },
            },
            {
                "name": "Recognition pathways",
                "type": PageSection.SectionType.FEATURE_GRID,
                "content": {
                    "heading": "Professional pathways and recognition support",
                    "body": "A learning environment connected to project controls, project management and workplace progression.",
                    "items": [
                        {"id": "kbc", "title": "Kent Business College", "body": "Delivering institution"},
                        {"id": "ipc", "title": "Institute of Project Controls", "body": "Membership pathway"},
                        {"id": "apm", "title": "APM pathway support", "body": "Recognition route"},
                        {"id": "pmi", "title": "PMI pathway support", "body": "Certification route"},
                        {"id": "othm", "title": "OTHM Level 7 pathway", "body": "Diploma progression"},
                        {"id": "employers", "title": "Employer partnerships", "body": "Workplace evidence"},
                    ],
                },
            },
            {
                "name": "Events and consultation",
                "type": PageSection.SectionType.CARD_GRID,
                "content": {
                    "heading": "Join an event or book a consultation",
                    "body": "Two ways to learn more about your options, funding and next steps.",
                    "items": [
                        {"id": "event", "eyebrow": "Monthly online", "title": "Information event", "body": "Learn about funding, eligibility, programme options and professional progression routes.", "cta": {"label": "View upcoming events", "url": "/events"}},
                        {"id": "consultation", "eyebrow": "One to one", "title": "Personal consultation", "body": "Discuss your role, employer, eligibility and the best pathway for you or your organisation.", "cta": {"label": "Book a consultation", "url": "/contact"}},
                    ],
                },
            },
            {
                "name": "Frequently asked questions",
                "type": PageSection.SectionType.FAQ,
                "anchor": "faq",
                "content": {
                    "heading": "Common questions",
                    "items": [
                        {"id": "funded", "question": "What does fully funded where eligible mean?", "answer": "Eligible employers and learners in England may access apprenticeship funding. Funding remains subject to employer eligibility, learner suitability, current rules and availability."},
                        {"id": "eligibility", "question": "Who is eligible for apprenticeship funding?", "answer": "Eligibility depends on the employer, the learner's residency, existing qualifications, role suitability and main place of work."},
                        {"id": "not-eligible", "question": "What if I am not eligible?", "answer": "Commercial routes may be available for self-employed professionals, learners outside England and people without employer support."},
                        {"id": "choose", "question": "How do I choose the right programme?", "answer": "Use the route finder or book a consultation for guidance based on your role, experience and goals."},
                        {"id": "delivery", "question": "How is the programme delivered?", "answer": "Delivery combines live online learning, guided study, portfolio development, workplace evidence and individual coaching."},
                        {"id": "employers", "question": "Can employers enrol multiple learners?", "answer": "Yes. Group delivery can be aligned to organisational roles, job descriptions and project environments."},
                        {"id": "chpp", "question": "Is chartered status guaranteed?", "answer": "No. Pathway and readiness support may be provided, but professional status is awarded independently against the relevant body's criteria."},
                    ],
                },
            },
            {
                "name": "Closing call to action",
                "type": PageSection.SectionType.CTA,
                "content": {
                    "heading": "Find the right project controls pathway",
                    "body": "Tell us about your role, organisation and goals. An adviser will help you understand the most suitable next step.",
                    "cta": {"label": "Book a consultation", "url": "/contact"},
                },
            },
        ]

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

        self.stdout.write(self.style.SUCCESS(f"Seeded homepage with {len(sections)} editable sections."))

