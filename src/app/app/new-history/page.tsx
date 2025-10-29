"use client";
import {
  MainLayout,
  MainLayoutSection,
  MainLayoutTitle,
} from "@/components/main-layout";
import { initializeStory } from "@/modules/stories/features/scene-generation/chat";
import { CreateHistoryForm } from "@/modules/stories/pages/create-story/init-storty-form";
import Scene2Page from "@/modules/stories/pages/create-story/scene2";
import { useState } from "react";

export default function NewHistoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [initStoryResponse, setInitStoryResponse] = useState<(Awaited<
    ReturnType<typeof initializeStory>
  > & {
    storyTitle: string;
    userLocality: string;
  }) | null>(null);

  console.log("Renderizando NewHistoryPage con initStoryResponse:", initStoryResponse);

  return (
    <MainLayout>
      <MainLayoutSection className="w-full flex flex-col items-center gap-4">
        <MainLayoutTitle>Nueva Historia</MainLayoutTitle>
        {!initStoryResponse ? (
          <CreateHistoryForm setInitStoryResponse={setInitStoryResponse} />
        ) : (
          <Scene2Page data={initStoryResponse} />
        )}
      </MainLayoutSection>
    </MainLayout>
  );
}
