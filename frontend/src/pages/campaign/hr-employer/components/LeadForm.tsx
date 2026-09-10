import EnquiryForm from '@/components/feature/EnquiryForm';

export default function LeadForm() {
  return (
<section id="lead-form" className="py-16 md:py-20 bg-primary-700"><div className="container-site max-w-2xl"><h2 className="mb-6 text-3xl text-white">Discuss your development needs</h2><EnquiryForm enquiryType="Campaign enquiry" context="hr-employer" /></div></section>
  );
}
