import { getAllTestimonials } from "@/lib/actions/testimonials";
import { TestimonialList } from "./testimonial-list";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return <TestimonialList testimonials={testimonials} />;
}
