import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = 'force-dynamic';

async function getContent() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("content").select("id, homepageIntro, aboutHero, aboutStory").limit(1).maybeSingle();
  return data || { id: 1, homepageIntro: "", aboutHero: "", aboutStory: "" };
}

export default async function AdminContentPage() {
  const content = await getContent();

  async function save(formData: FormData) {
    "use server";
    const supabase = getSupabaseAdmin();
    const payload = {
      id: 1,
      homepageIntro: String(formData.get("homepageIntro") || ""),
      aboutHero: String(formData.get("aboutHero") || ""),
      aboutStory: String(formData.get("aboutStory") || ""),
    };
    await supabase.from("content").upsert(payload, { onConflict: "id" });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-[var(--font-playfair)] font-semibold">Content</h1>
      <form action={save} className="space-y-4">
        <div>
          <label className="block text-sm text-white/70">Homepage Intro</label>
          <textarea name="homepageIntro" rows={3} defaultValue={content.homepageIntro || ""} className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-white/70">About Hero</label>
          <textarea name="aboutHero" rows={3} defaultValue={content.aboutHero || ""} className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-white/70">About Story</label>
          <textarea name="aboutStory" rows={6} defaultValue={content.aboutStory || ""} className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2" />
        </div>
        <button className="btn-gold">Save</button>
      </form>
    </div>
  );
}


