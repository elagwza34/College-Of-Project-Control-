import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';
import Footer from '@/components/feature/Footer';
import { fetchShortCourses, type ShortCourse } from '@/services/shortCoursesApi';
import { getShortCourse, shortCourses as fallbackCourses } from '../data/shortCourses';

export default function ShortCourses() {
  const { slug } = useParams();
  const [courses, setCourses] = useState<ShortCourse[]>(fallbackCourses);
  const [failed, setFailed] = useState(false);
  const selected = useMemo(() => courses.find((course) => course.slug === slug) || getShortCourse(slug), [courses, slug]);

  useEffect(() => {
    const controller = new AbortController();
    fetchShortCourses(controller.signal)
      .then((items) => {
        if (items.length) setCourses(items);
        setFailed(false);
      })
      .catch(() => setFailed(true));
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        {selected ? (
          <>
            <CourseDetailSection course={selected} />
            <CourseDeepDive course={selected} />
          </>
        ) : (
          <>
            <ShortCoursesCompactHero />
            <ShortCoursesCatalogue courses={courses} failed={failed} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function ShortCoursesCompactHero() {
  return (
    <section className="bg-primary-950 pt-28 text-white md:pt-32">
      <div className="container-site py-10 md:py-12">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-300">Focused professional development</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">Short courses & modules.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
            Build one project-controls capability at a time through focused learning, practical examples and workplace application.
          </p>
        </div>
      </div>
    </section>
  );
}

function ShortCoursesCatalogue({ courses, failed }: { courses: ShortCourse[]; failed: boolean }) {
  return (
    <section id="courses" className="bg-background-100 py-16 md:py-20">
      <div className="container-site">
        <SectionHeading
          tag="Course catalogue"
          title="Choose the capability you want to strengthen."
          subtitle={failed ? 'Showing saved fallback content while the live course API is unavailable.' : 'Each course is designed to support applied professional practice, not just theory.'}
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <SiteLink
              key={course.slug}
              href={`/short-courses/${course.slug}`}
              className="group flex min-h-[26rem] flex-col overflow-hidden rounded-xl border border-background-200 bg-white transition hover:border-primary-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-primary-950">
                {course.imageUrl ? (
                  <img
                    loading="lazy"
                    decoding="async"
                    src={course.imageUrl}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="signal-pattern h-full w-full opacity-30" />
                )}
                <div className="absolute inset-0 bg-primary-950/42" />
                <span className="absolute left-4 top-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/90 text-primary-700 backdrop-blur">
                  <i className={`${course.icon} text-xl`} />
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-foreground-700 backdrop-blur">
                  {course.duration}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">{course.category}</p>
                <h3 className="mt-2 text-xl font-bold text-foreground-950">{course.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{course.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                  View course <i className="ri-arrow-right-line transition group-hover:translate-x-1" />
                </span>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseDetailSection({ course }: { course: ShortCourse }) {
  const details = [
    ['Duration', course.duration],
    ['Format', course.format],
    ['Owner', course.owner],
    ['Category', course.category],
  ];

  return (
    <section
      className="relative isolate flex min-h-[80vh] items-end overflow-hidden bg-primary-950 bg-cover bg-center pb-16 pt-32 text-white md:bg-fixed md:pb-20 md:pt-40"
      style={{ backgroundImage: course.imageUrl ? `url("${course.imageUrl}")` : undefined }}
    >
      <div className="absolute inset-0 -z-10 bg-primary-950/92" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950 via-primary-950/90 to-primary-950/76" />
      <div className="signal-pattern absolute inset-0 -z-10 opacity-10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-primary-950 to-transparent" />
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.72fr)] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-signal-300">
                <i className={`${course.icon} text-2xl`} />
              </span>
              <span className="rounded-full border border-signal-300/35 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-signal-300">
                {course.category}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {course.summary}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/62">
              {course.audience}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">
                Discuss this course
              </SiteLink>
              <SiteLink href="/short-courses" className="btn-secondary inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold text-white">
                Browse other courses
              </SiteLink>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-300">Course details</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <article key={label} className="rounded-xl border border-white/10 bg-primary-950/35 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
                  <p className="mt-2 font-heading text-base font-bold leading-snug text-white">{value}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-300">What this course develops</p>
              <div className="mt-4 grid gap-3">
                {course.focus.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/10 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-400 text-primary-950">
                      <i className="ri-check-line text-sm" />
                    </span>
                    <span className="text-sm font-semibold leading-relaxed text-white/82">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CourseDeepDive({ course }: { course: ShortCourse }) {
  const detail = course.detail || {};
  const bestFor = detail.bestFor?.length ? detail.bestFor : [course.audience].filter(Boolean);
  const learningBlocks = detail.learningBlocks?.length
    ? detail.learningBlocks
    : course.focus.map((item) => ({ title: item, body: `Develop practical confidence in ${item.toLowerCase()} through applied examples and professional discussion.` }));
  const workplaceOutputs = detail.workplaceOutputs?.length ? detail.workplaceOutputs : course.focus;

  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-700">Course page</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">A focused course built around real project work.</h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              {detail.positioning || course.summary}
            </p>

            <div className="mt-8 rounded-2xl border border-background-200 bg-white p-6">
              <h3 className="text-xl font-bold">Best suited to</h3>
              <ul className="mt-4 space-y-3">
                {bestFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground-700">
                    <i className="ri-user-follow-line mt-1 text-primary-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {learningBlocks.map((block) => (
              <article key={block.title} className="rounded-2xl border border-background-200 bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <i className="ri-checkbox-circle-line text-lg" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-600">{block.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-background-200 bg-white p-6 md:p-8">
            <h3 className="text-2xl font-bold">Workplace outputs you can shape</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {workplaceOutputs.map((item) => (
                <div key={item} className="rounded-xl bg-background-100 px-4 py-3 text-sm font-semibold text-foreground-800">
                  <i className="ri-file-list-3-line mr-2 text-accent-700" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border border-primary-200 bg-primary-50 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Professional context</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground-700">
              {detail.professionalContext || 'This course supports professional development and workplace capability. Any external certification, membership or award remains subject to the relevant professional body, examination and eligibility requirements.'}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
