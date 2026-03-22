import { notFound } from "next/navigation";
import { getActivityBySlug } from "@/lib/actions/activities";
import { iconMap } from "@/lib/icon-map";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    return { title: "Activity Not Found" };
  }

  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      title: `${activity.title} — Sevanjali Prathishtana`,
      description: activity.description,
      ...(activity.image_url && { images: [{ url: activity.image_url }] }),
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  const Icon = iconMap[activity.icon_name] || iconMap.Heart;

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        {activity.image_url && (
          <div className="absolute inset-0">
            <Image
              src={activity.image_url}
              alt={activity.title}
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-ash hover:text-cream transition-colors font-body text-sm mb-8"
          >
            <ArrowLeft size={16} />
            Back to Activities
          </Link>

          <div className="max-w-[680px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-saffron/10 text-saffron px-3 py-1 rounded-full font-body text-xs font-medium capitalize">
                {activity.type}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-saffron/10 rounded-xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-saffron" />
              </div>
              <h1
                data-cursor-grow
                className="font-display text-[clamp(36px,6vw,72px)] font-bold text-cream leading-[1.05]"
              >
                {activity.title}
              </h1>
            </div>

            <p className="font-body text-lg text-ash font-light leading-relaxed">
              {activity.description}
            </p>
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          {activity.detail_description && (
            <div className="glass-light rounded-xl p-6 sm:p-10 mb-8">
              <p className="font-body text-base text-earth/80 leading-relaxed whitespace-pre-line">
                {activity.detail_description}
              </p>
            </div>
          )}

          {activity.stats && activity.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {activity.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-light rounded-xl p-5 text-center"
                >
                  <p className="font-display text-2xl font-bold text-saffron">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-earth/60 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activity.image_url && (
            <div className="mt-8 rounded-xl overflow-hidden">
              <Image
                src={activity.image_url}
                alt={activity.title}
                width={900}
                height={500}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
