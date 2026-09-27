import { reportCmsError } from '../api/reportError';
import { useEffect, useRef, useState } from 'react';
import { cmsApi } from '../api/client';
import { DashboardEmptyState, DashboardPageHeader, DashboardSkeletonList, StatusBadge } from '../components/DashboardPrimitives';

interface DashboardShortCourse {
  id: number;
  slug: string;
  title: string;
  category: string;
  duration: string;
  format: string;
  owner: string;
  audience: string;
  summary: string;
  focus: string[];
  detail: Record<string, unknown>;
  icon: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

interface MediaUploadResponse {
  url: string;
}

const emptyCourse = {
  slug: '',
  title: 'New short course',
  category: '',
  duration: '',
  format: 'Professional learning',
  owner: '',
  audience: '',
  summary: '',
  focus: [],
  detail: {},
  icon: 'ri-book-open-line',
  image_url: '',
  order: 0,
  is_active: true,
};

export default function ShortCoursesDashboardPage() {
  const [courses, setCourses] = useState<DashboardShortCourse[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  const load = () => cmsApi.get<DashboardShortCourse[]>('/short-courses/').then(setCourses).catch(reportCmsError);

  useEffect(() => {
    load();
  }, []);

  const createCourse = async () => {
    setAdding(true);
    try {
      const created = await cmsApi.post<DashboardShortCourse>('/short-courses/', {
        ...emptyCourse,
        slug: `short-course-${Date.now()}`,
        order: (courses?.length ?? 0) * 10 + 10,
      });
      await load();
      setEditingCourseId(created.id);
    } catch (error) {
      reportCmsError(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteCourse = async (id: number) => {
    if (!window.confirm('Delete this short course? Its page will be removed from the short-course catalogue. This action cannot be undone.')) return;
    try {
      await cmsApi.del(`/short-courses/${id}/`);
      if (editingCourseId === id) setEditingCourseId(null);
      await load();
    } catch (error) {
      reportCmsError(error);
    }
  };

  const editingCourse = courses?.find((course) => course.id === editingCourseId) ?? null;

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Website content"
        title="Short courses"
        description="Manage the short-course catalogue, page content and hero images. Uploaded images are stored in the Media Library and saved here as image links."
        meta={courses && <StatusBadge tone="info">{courses.length} courses</StatusBadge>}
        actions={
        <button type="button" onClick={createCourse} disabled={adding} className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50">
          {adding ? 'Adding...' : 'Add course'}
        </button>
        }
      />

      <div className="mt-6">
        {courses === null ? (
          <DashboardSkeletonList rows={6} />
        ) : courses.length === 0 ? (
          <DashboardEmptyState
            icon="ri-book-open-line"
            title="No short courses yet"
            description="Create the first short course, then add its page summary, audience, focus items and hero image."
            action={<button type="button" onClick={createCourse} disabled={adding} className="btn-primary px-5 py-3">{adding ? 'Adding...' : 'Add course'}</button>}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={() => setEditingCourseId(course.id)}
                onDelete={() => deleteCourse(course.id)}
              />
            ))}
          </div>
        )}
      </div>

      {editingCourse && (
        <CourseEditModal
          course={editingCourse}
          onClose={() => setEditingCourseId(null)}
          onDelete={() => deleteCourse(editingCourse.id)}
          onSaved={load}
        />
      )}
    </div>
  );
}

function CourseCard({ course, onEdit, onDelete }: { course: DashboardShortCourse; onEdit: () => void; onDelete: () => void }) {
  return (
    <article className="interactive-surface group flex h-full flex-col overflow-hidden rounded-xl border border-background-200/80 bg-white shadow-sm hover:border-primary-200 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-background-100">
        {course.image_url ? (
          <img loading="lazy" decoding="async" src={course.image_url} alt={course.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-foreground-300">
            <i className={`${course.icon || 'ri-book-open-line'} text-4xl`} aria-hidden="true" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <StatusBadge tone={course.is_active ? 'success' : 'neutral'}>{course.is_active ? 'Published' : 'Draft'}</StatusBadge>
          <StatusBadge tone="info">{course.duration || 'No duration'}</StatusBadge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-primary-700">{course.category || 'Uncategorised'}</p>
            <h2 className="mt-2 font-heading text-base font-bold leading-tight text-foreground-950">{course.title || 'Untitled course'}</h2>
          </div>
          <span className="shrink-0 rounded-full bg-background-100 px-2.5 py-1 text-xs font-bold text-foreground-600">#{course.order}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground-600">{course.summary || course.audience || 'No summary added yet.'}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-background-100 px-3 py-1 text-xs font-semibold text-foreground-700">{course.format || 'Format missing'}</span>
          <span className="rounded-full bg-background-100 px-3 py-1 text-xs font-semibold text-foreground-700">{course.focus.length} focus items</span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <button type="button" onClick={onEdit} className="btn-primary inline-flex min-h-9 items-center gap-2 px-3 text-sm font-bold">
            <i className="ri-edit-line" aria-hidden="true" />
            Edit
          </button>
          <a href={`/short-courses/${course.slug}`} target="_blank" rel="noreferrer" className="button-quiet min-h-9 px-3">
            View
          </a>
          <button type="button" onClick={onDelete} className="ml-auto inline-flex min-h-9 items-center justify-center rounded-md border border-red-200 px-3 text-sm font-semibold text-red-700 transition-all hover:bg-red-50 hover:shadow-sm">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function CourseEditModal({ course, onClose, onDelete, onSaved }: { course: DashboardShortCourse; onClose: () => void; onDelete: () => void; onSaved: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-foreground-950/65 p-4 backdrop-blur-sm md:p-6" role="dialog" aria-modal="true" aria-labelledby="short-course-edit-title">
      <div className="mx-auto flex min-h-full max-w-7xl items-center">
        <section className="modal-panel w-full overflow-hidden rounded-2xl border border-background-200 bg-white shadow-2xl">
          <header className="flex flex-col gap-4 border-b border-background-200 bg-background-50 px-5 py-4 md:flex-row md:items-start md:justify-between md:px-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-primary-700">Edit short course</p>
              <h2 id="short-course-edit-title" className="mt-1 font-heading text-2xl font-bold text-foreground-950">{course.title || 'Untitled course'}</h2>
              <a href={`/short-courses/${course.slug}`} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-semibold text-primary-700 underline">
                View course page
              </a>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button type="button" onClick={onDelete} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">
                Delete course
              </button>
              <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-lg border border-background-200 bg-white text-foreground-700 hover:bg-background-100" aria-label="Close editor">
                <i className="ri-close-line text-xl" aria-hidden="true" />
              </button>
            </div>
          </header>
          <div className="max-h-[calc(100vh-170px)] overflow-y-auto p-5 md:p-7">
            <CourseEditor course={course} onSaved={onSaved} />
          </div>
        </section>
      </div>
    </div>
  );
}

function CourseEditor({ course, onSaved }: { course: DashboardShortCourse; onSaved: () => void }) {
  const [form, setForm] = useState(course);
  const [focusText, setFocusText] = useState(course.focus.join('\n'));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(course);
    setFocusText(course.focus.join('\n'));
    setSaved(false);
  }, [course]);

  const set = <K extends keyof DashboardShortCourse>(key: K, value: DashboardShortCourse[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const uploadImage = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('alt_text', form.title);
      const uploaded = await cmsApi.post<MediaUploadResponse>('/media/', data);
      set('image_url', uploaded.url);
    } catch (error) {
      reportCmsError(error);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      await cmsApi.patch(`/short-courses/${course.id}/`, {
        ...form,
        focus: focusText.split('\n').map((item) => item.trim()).filter(Boolean),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
      onSaved();
    } catch (error) {
      reportCmsError(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-background-200 bg-background-100">
            {form.image_url ? (
              <img loading="lazy" decoding="async" src={form.image_url} alt={form.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-foreground-300">
                <i className="ri-image-line text-3xl" />
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => fileInput.current?.click()} disabled={uploading} className="btn-secondary px-3 py-2 text-xs font-semibold">
              {uploading ? 'Uploading...' : 'Upload image'}
            </button>
            <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(event) => void uploadImage(event.target.files?.[0] || null)} />
          </div>
          <TextField id={`image-${course.id}`} label="Image link" value={form.image_url} onChange={(value) => set('image_url', value)} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <TextField id={`title-${course.id}`} label="Title" value={form.title} onChange={(value) => set('title', value)} />
          <TextField id={`slug-${course.id}`} label="Slug" value={form.slug} onChange={(value) => set('slug', value)} />
          <TextField id={`category-${course.id}`} label="Category" value={form.category} onChange={(value) => set('category', value)} />
          <TextField id={`duration-${course.id}`} label="Duration" value={form.duration} onChange={(value) => set('duration', value)} />
          <TextField id={`format-${course.id}`} label="Format" value={form.format} onChange={(value) => set('format', value)} />
          <TextField id={`owner-${course.id}`} label="Owner" value={form.owner} onChange={(value) => set('owner', value)} />
          <TextField id={`icon-${course.id}`} label="Icon class" value={form.icon} onChange={(value) => set('icon', value)} />
          <label className="text-xs font-semibold text-foreground-600">
            Order
            <input type="number" value={form.order} onChange={(event) => set('order', Number(event.target.value))} className="mt-1 w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none" />
          </label>

          <TextArea id={`summary-${course.id}`} label="Summary" value={form.summary} rows={3} onChange={(value) => set('summary', value)} className="sm:col-span-2" />
          <TextArea id={`audience-${course.id}`} label="Audience" value={form.audience} rows={3} onChange={(value) => set('audience', value)} className="sm:col-span-2" />
          <TextArea id={`focus-${course.id}`} label="Focus items (one per line)" value={focusText} rows={4} onChange={setFocusText} className="sm:col-span-2" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" onClick={save} disabled={saving || uploading} className="btn-primary px-5 py-2 text-sm font-semibold disabled:opacity-50">
          {saving ? 'Saving...' : 'Save course'}
        </button>
        <label className="flex items-center gap-2 text-sm text-foreground-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => set('is_active', event.target.checked)} />
          Published
        </label>
        {!form.is_active && <span className="text-xs font-semibold text-background-600">Draft - hidden from the live site</span>}
        {saved && <span role="status" className="text-xs font-medium text-highlight-700">Course saved.</span>}
      </div>
    </div>
  );
}

function TextField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label htmlFor={id} className="text-xs font-semibold text-foreground-600">
      {label}
      <input id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none" />
    </label>
  );
}

function TextArea({ id, label, value, rows, onChange, className = '' }: { id: string; label: string; value: string; rows: number; onChange: (value: string) => void; className?: string }) {
  return (
    <label htmlFor={id} className={`text-xs font-semibold text-foreground-600 ${className}`}>
      {label}
      <textarea id={id} value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full resize-y rounded-md border border-background-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none" />
    </label>
  );
}
