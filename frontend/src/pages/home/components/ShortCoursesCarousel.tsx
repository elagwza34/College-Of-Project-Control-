import { useEffect, useState } from 'react';
import SiteLink from '@/components/base/SiteLink';
import { fetchShortCourses, type ShortCourse } from '@/services/shortCoursesApi';
import { shortCourses as fallbackCourses } from '@/pages/short-courses/data/shortCourses';

const homepageCourseSlugs = [
  'ai-in-project-controls',
  'project-planning-control',
  'earned-value-management',
];

function selectHomepageCourses(courses: ShortCourse[]) {
  return homepageCourseSlugs
    .map((slug) => courses.find((course) => course.slug === slug))
    .filter((course): course is ShortCourse => Boolean(course));
}

export default function ShortCoursesCarousel() {
  const [courses, setCourses] = useState<ShortCourse[]>(selectHomepageCourses(fallbackCourses));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchShortCourses(controller.signal)
      .then((items) => {
        const selected = selectHomepageCourses(items);
        if (selected.length) setCourses(selected);
        setFailed(false);
      })
      .catch(() => setFailed(true));
    return () => controller.abort();
  }, []);

  if (courses.length === 0) return null;

  return (
    <section id="short-courses-preview" className="bg-background-50 py-16 md:py-24" aria-labelledby="short-courses-preview-heading">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Professional development</p>
            <h2 id="short-courses-preview-heading" className="mt-3 text-3xl font-bold text-foreground-950 md:text-4xl">
              Build a specialist capability
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-600">
              Explore focused professional development in planning, controls, performance and emerging project technologies.
              {failed ? ' Showing saved course content while live course data is unavailable.' : ''}
            </p>
          </div>
          <SiteLink href="/short-courses" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-700">
            View all professional courses <i className="ri-arrow-right-line" aria-hidden="true" />
          </SiteLink>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article key={course.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-primary-950">
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/82 via-primary-950/20 to-transparent" />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/92 text-primary-700">
                  <i className={`${course.icon} text-lg`} aria-hidden="true" />
                </span>
                <span className="absolute bottom-4 left-4 right-4 text-xs font-bold uppercase tracking-[.14em] text-signal-300">
                  {course.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-4 w-fit rounded-full bg-background-100 px-3 py-1 text-[11px] font-semibold text-foreground-700">
                  {course.duration}
                </span>
                <h3 className="text-xl font-bold leading-tight text-foreground-950">{course.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{course.summary}</p>
                <SiteLink href={`/short-courses/${course.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-700">
                  View course <i className="ri-arrow-right-line transition group-hover:translate-x-1" aria-hidden="true" />
                </SiteLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
