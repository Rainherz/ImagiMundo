import {
  MainLayout,
  MainLayoutSection,
  MainLayoutTitle,
} from "@/components/main-layout";
import { SearchBarContainer, SearchBar } from "@/components/search-bar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return (
    <>
      <MainLayout>
        <div className="flex space-y-4 md:space-y-0 flex-col  md:flex-row  md:justify-between">
          <div className="flex justify-between  gap-8">
            <MainLayoutTitle>Mis historias</MainLayoutTitle>
          </div>
          <SearchBarContainer>
            <SearchBar
              inputProps={{
                defaultValue: "",
              }}
            />
          </SearchBarContainer>
        </div>
        <MainLayoutSection></MainLayoutSection>
      </MainLayout>
    </>
  );
}
