"use client";
import {
  MainLayout,
  MainLayoutSection,
} from "@/components/main-layout";
import {
  continueStory,
  initializeStory,
} from "@/modules/stories/features/scene-generation/chat";
import FinalScene from "@/modules/stories/pages/create-story/final-scene";
import { CreateHistoryForm } from "@/modules/stories/pages/create-story/init-storty-form";
import Scene1Page from "@/modules/stories/pages/create-story/scene1";
import Scene2Page from "@/modules/stories/pages/create-story/scene2";
import { useState } from "react";

export default function NewHistoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [initStoryResponse, setInitStoryResponse] = useState<
    | (Awaited<ReturnType<typeof initializeStory>> & {
        storyTitle: string;
        userLocality: string;
      })
    | null
  >(null);

  const [toScene2, setToScene2] = useState<
    | (Awaited<ReturnType<typeof continueStory>> & {
        storyTitle: string;
        userLocality: string;
      })
    | null
  >(null);

  const [toFinalScene, setToFinalScene] = useState<
    | (Awaited<ReturnType<typeof continueStory>> & {
        storyTitle: string;
        userLocality: string;
      })
    | null
  >(null);

  return (
    <MainLayout className="bg-[url('/fondo.png')] bg-cover h-auto bg-center">
      <MainLayoutSection className="w-full flex flex-col items-center gap-4">
        {!initStoryResponse ? (
          <CreateHistoryForm setInitStoryResponse={setInitStoryResponse} />
        ) : !toScene2 ? (
          <Scene1Page data={initStoryResponse} setToScene2={setToScene2} />
        ) : !toFinalScene ? (
          <Scene2Page data={toScene2} setToFinalScene={setToFinalScene} />
        ) : (
          <FinalScene data={toFinalScene} />
        )}
      </MainLayoutSection>
    </MainLayout>
  );
}
