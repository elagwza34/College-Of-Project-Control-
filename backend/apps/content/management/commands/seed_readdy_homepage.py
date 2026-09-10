from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.content.models import (
    Coach,
    Event,
    MentorProfile,
    MenuItem,
    NavigationMenu,
    Page,
    PageSection,
    Partner,
    PublicationStatus,
    Sector,
    SiteSettings,
)


class Command(BaseCommand):
    help = "Create or refresh the editable homepage based on the supplied Readdy reference."

    def handle(self, *args, **options):
        mentor_defaults = [
            {
                "name": "Dr. Stephen Jenner",
                "initials": "SJ",
                "role_title": "Managing Portfolio Specialist",
                "affiliation": "UK Senior Civil Service",
                "specialties": "Portfolio Management, Benefits Management, Public Sector",
                "biography": (
                    "Extensive experience at senior level of the UK Senior Civil Service, where he "
                    "was Director of Criminal Justice IT and benefits management adviser on a range "
                    "of cross-government programmes."
                ),
                "linkedin_url": "https://www.linkedin.com/",
                "order": 10,
            },
            {
                "name": "Dr. Ray Mead",
                "initials": "RM",
                "role_title": "Project Management Consultant",
                "affiliation": "Founding Partner, p3m global",
                "specialties": "Project Management, Strategic Execution, P3M",
                "biography": (
                    "Founding Partner at p3m global, a leading consultancy in delivering sustainable "
                    "change and strategic execution. With over 20 years in the P3M industry, he is a "
                    "recognised thought leader advising FTSE 100 boards."
                ),
                "linkedin_url": "https://www.linkedin.com/",
                "order": 20,
            },
            {
                "name": "Dr. Amgad Badewi",
                "initials": "AB",
                "role_title": "Project Management Specialist",
                "affiliation": "Reader, University of Kent",
                "specialties": "Project Management, Programme Management",
                "biography": (
                    "A highly accomplished academic and practitioner in Project and Programme "
                    "Management, with a PhD from Cranfield University, serving as Reader at the "
                    "University of Kent and holding multiple leadership roles."
                ),
                "linkedin_url": "https://www.linkedin.com/",
                "order": 30,
            },
        ]
        for mentor in mentor_defaults:
            name = mentor["name"]
            MentorProfile.objects.update_or_create(name=name, defaults=mentor)

        coach_defaults = [
            {
                "name": "Adeyomi",
                "qualification": "MSc Strategic Project Management · MSc Urban Planning",
                "focus": "PMP preparation, scheduling and professional evidence.",
                "order": 10,
            },
            {
                "name": "Patryck",
                "qualification": "MSc Strategic Project Management",
                "focus": "Project management thinking, evidence development and study progress.",
                "order": 20,
            },
            {
                "name": "Aryan",
                "qualification": "MSc Strategic Project Management",
                "focus": "Portfolio evidence, study planning and workplace application.",
                "order": 30,
            },
            {
                "name": "Dr Randa",
                "qualification": "MSc · PhD in Operations Research",
                "focus": "Analytical thinking, data-informed decisions and structured evidence.",
                "order": 40,
            },
        ]
        for coach in coach_defaults:
            name = coach["name"]
            Coach.objects.update_or_create(name=name, defaults=coach)

        partner_logo_base = "https://jokdxsdbxorzciulkdyl.supabase.co/storage/v1/object/public/images/"
        partner_logo_files = [
            "f1b007c5c5314826b51cc5e408ad4322.webp",
            "4d32dd29a0f54f96911429817594774f.png",
            "b25f42a62d564028b7fc2ee9e87ccd83.jpg",
            "dcc7742ecfb84cbab3a835e956f1103b.jfif",
            "abe2fdd4255447a3a8c8211ffabdb066.png",
            "4dfd6a8809d74ca88831efbd34c7c480.png",
            "7bad9e0e4b8a4b308206b3561d538063.png",
            "34dfa2eb5a964f55abf9abd6b9e1dc20.png",
            "b47cf844b33c45f2bf8d32e23b678293.webp",
            "db02979c2ea049aab6bb767bbbe82ce8.jfif",
            "cd6a80bf9b794c9a9daceba9cb6e896e.png",
            "cf7ca0ac5a3b41a4a73b57204ec94004.png",
            "106d3c708f264071a9134b2613ba98c5.png",
            "29d525f1db9149059153d30ce6944209.png",
            "c5bdf826bfae4bcc864fffffa345cdc9.png",
            "2728569ca4e74a26b44d1787983f88d1.jfif",
            "1c5c753910a343858dd6cf7ac15f6c70.png",
            "1077053bf11c40399c194b6bf74c1c33.png",
            "7727308e293245f1962419946ec16ad0.jfif",
            "2284f4f65590424a942faf24bc04666a.png",
            "67eda34a6dab4f3d8ea5ded99d14a75e.jpg",
            "0c05ba0d9fb64a57861b77e39401f9a9.png",
            "a6671551be30474a92ac81d4f1a7ff65.png",
            "6e5e38eb6e1e44ed84032e856ab0d5cd.webp",
            "f17b25910a6942deacf83df93000e1d4.webp",
            "edf9285f313b4fc7bebc2a6f92f0492c.png",
        ]
        if not Partner.objects.filter(is_active=True).exists():
            for index, filename in enumerate(partner_logo_files, start=1):
                logo_url = f"{partner_logo_base}{filename}"
                Partner.objects.update_or_create(order=index * 10, defaults={"logo_url": logo_url})

        event_defaults = [
            {
                "title": "Project Controls Masterclass",
                "category": "Masterclass",
                "format": "online",
                "cadence": "Scheduled regularly — register your interest",
                "description": "Join practitioners to explore specialist Project Controls topics, masterclasses and professional discussions.",
                "cta_label": "Register Your Interest",
                "cta_href": "/contact",
                "order": 10,
            },
            {
                "title": "Monthly Online Information Session",
                "category": "Information Session",
                "format": "online",
                "cadence": "Monthly",
                "description": "Speak with the College about programmes, funding eligibility, specialist modules and employer development. No obligation.",
                "cta_label": "Book Your Place",
                "cta_href": "/book-a-session",
                "order": 20,
            },
            {
                "title": "Employer Capability Webinar",
                "category": "Webinar",
                "format": "online",
                "cadence": "Scheduled regularly — register your interest",
                "description": "For HR, L&D and senior leaders exploring how apprenticeship funding can build project controls capability across a team.",
                "cta_label": "Register Your Interest",
                "cta_href": "/employers",
                "order": 30,
            },
        ]
        for event in event_defaults:
            title = event["title"]
            Event.objects.update_or_create(title=title, defaults=event)

        sector_defaults = [
            {
                "title": "Construction",
                "slug": "construction",
                "description": "Planning, controls, cost, contracts and risk across complex delivery.",
                "icon": "ri-building-line",
                "image_url": "https://readdy.ai/api/search-image?query=Abstract%20geometric%20construction%20crane%20and%20steel%20building%20framework%20silhouette%2C%20warm%20burnt%20orange%20and%20concrete%20grey%20tones%2C%20minimalist%20editorial%20illustration%20style%2C%20clean%20lines%2C%20no%20people%2C%20professional%20business%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=construction-sector-2026&orientation=landscape",
                "link_url": "/project-controls-professional/construction-route",
                "order": 10,
            },
            {
                "title": "Engineering",
                "slug": "engineering",
                "description": "Integration, scheduling, cost and controls across engineering environments.",
                "icon": "ri-settings-4-line",
                "image_url": "https://readdy.ai/api/search-image?query=Abstract%20precision%20aerospace%20engineering%20geometry%2C%20turbine%20blades%20and%20mechanical%20gears%20silhouette%2C%20metallic%20silver%20and%20cool%20steel%20blue%20tones%2C%20minimalist%20editorial%20illustration%2C%20no%20people%2C%20professional%20manufacturing%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=engineering-sector-2026&orientation=landscape",
                "link_url": "/project-controls-professional/engineering-manufacturing-aerospace-route",
                "order": 20,
            },
            {
                "title": "Public Sector",
                "slug": "public-sector",
                "description": "Governance, assurance, capital programmes and accountable delivery.",
                "icon": "ri-government-line",
                "image_url": "https://readdy.ai/api/search-image?query=Abstract%20classical%20government%20building%20with%20column%20architecture%20and%20modern%20geometric%20overlay%2C%20sage%20green%20and%20warm%20stone%20tones%2C%20minimalist%20editorial%20illustration%2C%20no%20people%2C%20professional%20institutional%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=public-sector-2026&orientation=landscape",
                "link_url": "/project-controls-professional/public-sector-councils-route",
                "order": 30,
            },
            {
                "title": "Energy & Utilities",
                "slug": "energy",
                "description": "Planning, cost, risk and controls across complex assets and programmes.",
                "icon": "ri-flashlight-line",
                "image_url": "https://readdy.ai/api/search-image?query=Abstract%20offshore%20oil%20platform%20and%20wind%20turbine%20silhouettes%2C%20deep%20teal%20and%20navy%20blue%20tones%2C%20geometric%20minimalist%20style%2C%20clean%20editorial%20illustration%2C%20no%20people%2C%20professional%20energy%20sector%20aesthetic%2C%20soft%20gradient%20background&width=600&height=400&seq=energy-sector-2026&orientation=landscape",
                "link_url": "/project-controls-professional/energy-oil-gas-utilities-route",
                "order": 40,
            },
        ]
        for sector in sector_defaults:
            slug = sector["slug"]
            Sector.objects.update_or_create(slug=slug, defaults=sector)

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
                ("Programmes", "/programmes"),
                ("Employers", "/employers"),
                ("Professionals", "/apprentices"),
                ("Route finder", "/route-finder"),
                ("Knowledge hub", "/knowledge-hub"),
                ("Stories", "/testimonials"),
            ],
            start=1,
        ):
            MenuItem.objects.create(menu=header, label=label, url=url, order=order * 10)

        programmes_item = header.items.get(label="Programmes")
        for order, (label, url) in enumerate(
            [
                ("Project Controls Professional (Level 6)", "/pcp-master"),
                ("Strategic route", "/strategic-pcp"),
                ("Operational route", "/operational-pcp"),
                ("PMO & Governance route", "/pmo-pcp"),
                ("Chartered PMO Pathway", "/chartered-pmo-pathway"),
            ],
            start=1,
        ):
            MenuItem.objects.create(menu=header, parent=programmes_item, label=label, url=url, order=order * 10)

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
                    "eyebrow": "College of Project Controls & Management",
                    "title": "Build the capability",
                    "titleAccent": "to control complexity",
                    "body": (
                        "Specialist professional development for people responsible for projects, "
                        "planning, scheduling, cost, risk, PMO and strategic delivery."
                    ),
                    "secondaryBody": (
                        "Choose a complete professional programme, develop one specialist capability "
                        "or combine multiple Project Controls subjects around the responsibilities "
                        "you already hold."
                    ),
                    "tagline": (
                        "Professional Programmes · Specialist Modules · Employer Development · "
                        "IPC Scholarships & Bursaries"
                    ),
                    "primaryCta": {"label": "Explore Programmes", "url": "/#programmes"},
                    "secondaryCta": {"label": "Find Specialist Development", "url": "/#programmes"},
                    "tertiaryLink": {"label": "Check IPC Scholarships & Bursaries", "url": "/#ipc-support"},
                    "statsCaption": "Built for working professionals and project-driven organisations.",
                    "imageUrl": "/images/hero-professional.webp",
                    "stats": [
                        {"id": "employers", "value": "500+", "label": "Employer Organisations"},
                        {"id": "learners", "value": "2,000+", "label": "Professionals Developing"},
                        {"id": "completion", "value": "95%", "label": "Completion Rate"},
                        {"id": "sectors", "value": "15+", "label": "Project-Driven Sectors"},
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
                "variant": "programme",
                "content": {
                    "tag": "Professional Programmes",
                    "heading": "Professional development built around real project responsibility",
                    "body": (
                        "Develop deeper capability through structured programmes designed for "
                        "professionals working across Project Management, Project Controls and "
                        "PMO environments."
                    ),
                    "items": [
                        {
                            "id": "level-6-pcp",
                            "badge": "Professional Programme",
                            "title": "Project Controls Professional Level 6",
                            "meta": "Level 6 · Project Controls · Advanced Professional Development",
                            "body": "Advanced capability for complex project environments.",
                            "bestFor": (
                                "Develop senior capability across planning, scheduling, cost, "
                                "Earned Value, risk, governance, PMO and Project Controls "
                                "decision-making."
                            ),
                            "includes": ["Multiple professional development pathways available within the programme."],
                            "cta": {"label": "Explore Project Controls Professional", "url": "/pcp-master"},
                            "highlighted": True,
                            "ribbon": "Most Popular",
                        },
                        {
                            "id": "level-4-apm",
                            "badge": "Professional Programme",
                            "title": "Associate Project Manager Level 4",
                            "meta": "Level 4 · Project Management · Applied Professional Development",
                            "body": "Build stronger capability across project delivery.",
                            "bestFor": (
                                "Strengthen project governance, planning, schedule, cost, risk, "
                                "stakeholder management and delivery while applying development "
                                "directly to real work."
                            ),
                            "includes": ["Apply development directly to real work"],
                            "cta": {"label": "Explore Associate Project Manager", "url": "/associate-project-manager-level-4"},
                        },
                        {
                            "id": "level-6-pmo",
                            "badge": "Professional Programme",
                            "title": "Certified PMO Professional Level 6",
                            "meta": "Level 6 · PMO · Professional Development",
                            "body": "Develop strategic PMO capability.",
                            "bestFor": (
                                "Build advanced capability across governance, integrated controls, "
                                "risk, quality, stakeholder leadership and evidence-based reporting."
                            ),
                            "includes": ["Strategic governance & integrated controls", "Evidence-based reporting systems"],
                            "cta": {"label": "Explore Certified PMO Professional", "url": "/pmo-pcp"},
                        },
                    ],
                    "comparison": {
                        "heading": "Which programme best fits your responsibilities?",
                        "body": "Compare each programme against the responsibilities it is best suited to.",
                        "programmes": [
                            {
                                "id": "pcp-l6",
                                "title": "Project Controls Professional Level 6",
                                "level": "Level 6",
                                "discipline": "Project Controls",
                                "bestSuited": (
                                    "Professionals responsible for planning, scheduling, cost, risk, "
                                    "controls, PMO and complex project performance."
                                ),
                            },
                            {
                                "id": "apm-l4",
                                "title": "Associate Project Manager Level 4",
                                "level": "Level 4",
                                "discipline": "Project Management",
                                "bestSuited": (
                                    "Professionals developing broader project-management and "
                                    "delivery responsibility."
                                ),
                            },
                            {
                                "id": "pmo-l6",
                                "title": "Certified PMO Professional Level 6",
                                "level": "Level 6",
                                "discipline": "PMO",
                                "bestSuited": (
                                    "Experienced PMO, project and Project Controls professionals "
                                    "developing strategic governance and PMO capability."
                                ),
                            },
                        ],
                        "cta": {"label": "Compare Programmes", "url": "/programmes"},
                    },
                    "guidance": {
                        "tag": "Programme Guidance",
                        "heading": "Not sure which programme fits your responsibilities?",
                        "body": (
                            "Start with the work you do now, the capability you want to strengthen "
                            "and the professional direction you want to build towards."
                        ),
                        "steps": [
                            {
                                "id": "role",
                                "number": "01",
                                "title": "Your Role",
                                "body": "What are you responsible for today?",
                            },
                            {
                                "id": "capability",
                                "number": "02",
                                "title": "Your Capability",
                                "body": "What do you need to strengthen?",
                            },
                            {
                                "id": "development",
                                "number": "03",
                                "title": "Your Development",
                                "body": "Do you need a complete programme or targeted specialist development?",
                            },
                            {
                                "id": "direction",
                                "number": "04",
                                "title": "Your Professional Direction",
                                "body": "What do you want to build towards next?",
                            },
                        ],
                        "cta": {"label": "Discuss My Development", "url": "/contact"},
                    },
                },
            },
            {
                "name": "IPC scholarships and bursaries",
                "type": PageSection.SectionType.STAT_SPOTLIGHT,
                "anchor": "ipc-support",
                "content": {
                    "tag": "IPC Scholarships & Bursaries",
                    "heading": "Make specialist Project Controls development more accessible",
                    "body": (
                        "The Institute of Project Controls supports access to selected Project "
                        "Controls professional development through scholarships and bursaries, "
                        "subject to the applicable programme or module, eligibility, approval and "
                        "availability."
                    ),
                    "stat": "50% / 75%",
                    "statCaption": "Depending on the selected Project Controls module",
                    "statBody": (
                        "Applicable support is determined by the selected Project Controls module "
                        "and confirmed through the Institute of Project Controls."
                    ),
                    "items": [
                        {"id": "one-module", "icon": "file", "label": "One module", "body": "Target one specialist capability."},
                        {"id": "multi-module", "icon": "layers", "label": "Multiple modules", "body": "Combine related Project Controls subjects."},
                        {"id": "employer", "icon": "building", "label": "Employer development", "body": "Build specialist capability across an individual or team."},
                    ],
                    "primaryCta": {"label": "Explore IPC Scholarships", "url": "/contact"},
                    "secondaryCta": {"label": "Check Scholarship & Bursary Information", "url": "https://instituteofprojectcontrols.com/"},
                    "disclaimer": (
                        "Scholarships and bursaries are administered by the Institute of Project "
                        "Controls and remain subject to eligibility, approval, capacity and availability."
                    ),
                    "logoUrl": "/images/ipc-logo.png",
                },
            },
            {
                "name": "Mentor team",
                "type": PageSection.SectionType.CARD_GRID,
                "anchor": "mentors",
                "variant": "mentors",
                "content": {
                    "tag": "Learn from practitioners",
                    "heading": "Learn from people who understand the work",
                    "body": (
                        "Our mentors bring professional experience from project, programme, PMO "
                        "and Project Controls environments."
                    ),
                    "items": [
                        {
                            "id": "stephen-jenner",
                            "initials": "SJ",
                            "name": "Dr. Stephen Jenner",
                            "role": "Managing Portfolio Specialist",
                            "affiliation": "UK Senior Civil Service",
                            "specialties": ["Portfolio Management", "Benefits Management", "Public Sector"],
                            "body": (
                                "Extensive experience at senior level of the UK Senior Civil Service, "
                                "where he was Director of Criminal Justice IT and benefits management "
                                "adviser on a range of cross-government programmes."
                            ),
                            "linkedinUrl": "https://www.linkedin.com/",
                        },
                        {
                            "id": "ray-mead",
                            "initials": "RM",
                            "name": "Dr. Ray Mead",
                            "role": "Project Management Consultant",
                            "affiliation": "Founding Partner, p3m global",
                            "specialties": ["Project Management", "Strategic Execution", "P3M"],
                            "body": (
                                "Founding Partner at p3m global, a leading consultancy in delivering "
                                "sustainable change and strategic execution. With over 20 years in the "
                                "P3M industry, he is a recognised thought leader advising FTSE 100 boards."
                            ),
                            "linkedinUrl": "https://www.linkedin.com/",
                        },
                        {
                            "id": "amgad-badewi",
                            "initials": "AB",
                            "name": "Dr. Amgad Badewi",
                            "role": "Project Management Specialist",
                            "affiliation": "Reader, University of Kent",
                            "specialties": ["Project Management", "Programme Management"],
                            "body": (
                                "A highly accomplished academic and practitioner in Project and "
                                "Programme Management, with a PhD from Cranfield University, serving "
                                "as Reader at the University of Kent and holding multiple leadership roles."
                            ),
                            "linkedinUrl": "https://www.linkedin.com/",
                        },
                    ],
                },
            },
            {
                "name": "For employers",
                "type": PageSection.SectionType.MEDIA_COPY,
                "anchor": "employers",
                "variant": "employer-capability",
                "content": {
                    "tag": "For employers",
                    "heading": "Build Project Controls capability across your organisation",
                    "body": (
                        "Develop individual specialists, strengthen a PMO or build structured "
                        "capability across a wider Project Controls function."
                    ),
                    "features": [
                        {
                            "id": "gaps",
                            "title": "Target Capability Gaps",
                            "body": "Focus development on the skills your organisation actually needs.",
                        },
                        {
                            "id": "talent",
                            "title": "Develop Existing Talent",
                            "body": "Build on the experience already inside your organisation.",
                        },
                        {
                            "id": "real-work",
                            "title": "Apply Learning to Real Work",
                            "body": "Connect development directly to live projects, systems and responsibilities.",
                        },
                        {
                            "id": "role-relevant",
                            "title": "Build Role-Relevant Development",
                            "body": "Choose complete programmes or targeted specialist modules.",
                        },
                    ],
                    "highlight": "Target capability gaps without over-training your team.",
                    "primaryCta": {"label": "Build a Capability Plan", "url": "/employers"},
                    "secondaryCta": {"label": "Book an Employer Consultation", "url": "/contact"},
                    "imageUrl": "/images/employer-capability-team.png",
                    "imageAlt": "Project controls professionals collaborating around a planning table",
                    "imagePanel": {
                        "heading": "Employer capability development",
                        "body": "Develop individual specialists, teams or entire functions.",
                        "cta": {"label": "Learn more", "url": "/employers"},
                    },
                },
            },
            {
                "name": "Specialist modules",
                "type": PageSection.SectionType.CARD_GRID,
                "anchor": "specialist-modules",
                "variant": "specialist-modules",
                "content": {
                    "tag": "Specialist modules",
                    "heading": "Choose the specialist capability you want to build",
                    "body": (
                        "Explore the core project controls and management modules available through "
                        "our professional development pathways."
                    ),
                    "items": [
                        {"id": "pmp", "title": "Project Management Professional (PMP)"},
                        {"id": "ai", "title": "AI in Project Controls"},
                        {"id": "risk", "title": "Risk Management"},
                        {"id": "scheduling", "title": "Scheduling Professional (SP)"},
                        {"id": "evm", "title": "Earned Value Management (EVM)"},
                        {"id": "ppc", "title": "Project Planning and Controls (PPC)"},
                        {"id": "msp", "title": "Managing Successful Programmes (MSP)"},
                        {"id": "portfolio", "title": "Management of Portfolios"},
                        {"id": "pmo", "title": "Project Management Office (PMO)"},
                    ],
                    "cta": {"label": "Explore Specialist Modules", "url": "/specialist-modules"},
                },
            },
            {
                "name": "Professional experience",
                "type": PageSection.SectionType.FEATURE_GRID,
                "anchor": "college-experience",
                "variant": "college-experience",
                "content": {
                    "tag": "More than professional training",
                    "heading": "A complete professional-development experience",
                    "body": (
                        "The College combines specialist project learning with professional support, "
                        "wellbeing, career development, recognition and opportunities to connect "
                        "with the wider Project Controls profession."
                    ),
                    "items": [
                        {
                            "id": "academic-support",
                            "title": "Academic & Professional Support",
                            "subtitle": "Support beyond the live session",
                            "points": [
                                "Practitioner-led professional learning",
                                "Learning materials in digital and physical formats where provided",
                                "Personal development dashboards",
                                "Structured professional guidance",
                                "Ongoing learner support throughout development",
                            ],
                        },
                        {
                            "id": "wellbeing",
                            "title": "Wellbeing Support",
                            "subtitle": "Supporting the person behind the professional",
                            "points": [
                                "Private healthcare insurance during the applicable programme",
                                "Access to mental wellbeing support systems",
                                "Mental wellbeing self-assessment tools",
                                "Inclusiveness assessments",
                                "Optional support assessments for potential barriers to education",
                            ],
                        },
                        {
                            "id": "career",
                            "title": "Career & Self-Development",
                            "subtitle": "Understand your strengths and professional direction",
                            "points": [
                                "Optional personality-traits assessment",
                                "RAISEC career-interest assessment",
                                "Job-fit and career-fit assessments",
                                "Personal-development dashboards",
                                "Career and professional-direction guidance",
                            ],
                        },
                        {
                            "id": "recognition",
                            "title": "Professional Recognition",
                            "subtitle": "Build professional visibility as you develop",
                            "points": [
                                "Relevant professional-body memberships where included",
                                "Professional qualification and examination support where included",
                                "Institute of Project Controls membership where applicable",
                                "Professional recognition and progression guidance",
                                "Chartered progression support where relevant",
                            ],
                        },
                        {
                            "id": "events",
                            "title": "Masterclasses & Professional Events",
                            "subtitle": "Learn beyond the programme",
                            "points": [
                                "London Masterclass events three times per year",
                                "Specialist Project Controls events",
                                "Professional workshops",
                                "Networking opportunities",
                                "Practitioner and employer events",
                            ],
                        },
                        {
                            "id": "community",
                            "title": "Professional Community",
                            "subtitle": "Connect with the profession",
                            "points": [
                                "Professional clubs",
                                "Workshops in different cities",
                                "Networking with practitioners",
                                "Professional community opportunities",
                                "Events with employers and industry specialists",
                            ],
                        },
                        {
                            "id": "graduation",
                            "title": "Graduation & Recognition",
                            "subtitle": "Recognise professional achievement",
                            "points": [
                                "Graduation ceremony",
                                "Professional achievement recognition",
                                "College community celebration",
                                "Relevant professional progression support",
                            ],
                        },
                    ],
                    "closingBody": (
                        "Professional development should strengthen more than technical knowledge. "
                        "The College experience is designed to support capability, wellbeing, "
                        "confidence, professional visibility and long-term development."
                    ),
                    "cta": {"label": "Explore the College Experience", "url": "/college-experience"},
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
                "name": "Knowledge hub insights",
                "type": PageSection.SectionType.CARD_GRID,
                "content": {
                    "heading": "Insights for better project decisions",
                    "body": "Practical guidance for employers and professionals across Project Controls, PMO, funding and professional progression.",
                    "items": [
                        {"id": "pcp", "eyebrow": "Programme guide", "title": "What is a Project Controls Professional apprenticeship?", "body": "Understand the capability, workplace evidence and funding model.", "cta": {"label": "Explore the Knowledge Hub", "url": "/knowledge-hub"}},
                        {"id": "funding", "eyebrow": "Employer guide", "title": "How funded professional development works", "body": "Review levy, co-investment and commercial access routes.", "cta": {"label": "Read employer guidance", "url": "/knowledge-hub"}},
                        {"id": "routes", "eyebrow": "Route guide", "title": "Strategic vs Operational Project Controls", "body": "Compare routes against current responsibility and future direction.", "cta": {"label": "Compare routes", "url": "/knowledge-hub"}},
                    ],
                },
            },
            {
                "name": "Homepage enquiry",
                "type": PageSection.SectionType.LEAD_FORM,
                "anchor": "contact",
                "content": {
                    "tag": "Find your next step",
                    "heading": "Not sure which programme or specialist development fits?",
                    "body": "Tell us about your role, responsibilities or team capability needs and an adviser will help identify the most relevant option.",
                    "enquiryTypes": ["Programme consultation", "Employer capability", "Specialist modules", "Funding eligibility", "General enquiry"],
                    "buttonLabel": "Request guidance",
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
