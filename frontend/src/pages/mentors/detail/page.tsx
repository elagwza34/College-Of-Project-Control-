import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import { fetchMentor, type Mentor } from '@/services/mentorsApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MeetTheMentor from "./components/MeetTheMentor";
import MentorProfile from "./components/MentorProfile";
export default function MentorDetailPage() {
  const { id } = useParams();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if(!id) {
      setFailed(true);
      return;
    }
    let active = true;
    setMentor(null);
    setFailed(false);
    fetchMentor(id).then(item => {
      if(active)
        setMentor(item);
    }).catch(() => {
      if(active)
        setFailed(true);
    });
    return () => { active = false; };
  }, [id, attempt]);
  if(failed) {
    return (<div className="min-h-screen bg-background-50">
      <MentorProfile setAttempt={setAttempt} />
      <Footer />
    </div>);
  }
  if(!mentor) {
    return <div className="page-loader bg-background-50" role="status">Loading mentor profile…</div>;
  }
  return (<>



    <div className="min-h-screen bg-background-50">
      <main className="pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="container-site">
          <SiteLink href="/#mentors" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">
            <i className="ri-arrow-left-line" />
            Back to mentors
          </SiteLink>

          <MeetTheMentor mentor={mentor} />
        </div>
      </main>
      <Footer />
    </div>
  </>);
}
