import {
  MainLayout,
  MainLayoutSection,
  MainLayoutTitle,
} from "@/components/main-layout";

export default async function NewHistoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return <MainLayout></MainLayout>;
}
