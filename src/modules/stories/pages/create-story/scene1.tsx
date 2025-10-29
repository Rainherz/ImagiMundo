import {
  MainLayout,
  MainLayoutSection,
  MainLayoutSubTitle,
  MainLayoutTitle,
} from "@/components/main-layout";
import {
  continueStory,
  initializeStory,
} from "../../features/scene-generation/chat";
import { useStories } from "../../queries";
import { toast } from "sonner";
import { generateSceneImage } from "../../features/image-generation/api";
import React from "react";
import Image from "next/image";
import { DashedLine } from "@/components/dashed-line";
import { Card, CardAction } from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import WordDefinitionModal, { getWordContexts } from "./word-difinition";

export default function Scene1Page({
  data: givenParameters,
  setToScene2,
}: {
  data: Awaited<ReturnType<typeof initializeStory>> & {
    storyTitle: string;
    userLocality: string;
  };
  setToScene2: React.Dispatch<
    React.SetStateAction<
      | (Awaited<ReturnType<typeof continueStory>> & {
          storyTitle: string;
          userLocality: string;
        })
      | null
    >
  >;
}) {
  const { useGenerateImage, useContinueStory } = useStories();
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [image, setImage] = React.useState<string | null>(null);
  const [mimeType, setMimeType] = React.useState<string | null>(null);
  const generateImage = useGenerateImage({
    onError: (error) => toast.error(error.message),
    onSuccess: (data: Awaited<ReturnType<typeof generateSceneImage>>) => {
      setImage(data.base64);
      setLoadingImage(false);
      setMimeType(data.mimeType);
    },
  });

  const mutateContinueStory = useContinueStory({
    onError: (error) => toast.error(error.message),
    onSuccess: (data: Awaited<ReturnType<typeof continueStory>>) => {
      setToScene2({...data,
        storyTitle: givenParameters.storyTitle,
        userLocality: givenParameters.userLocality
      });
    },
  });

  function handleSubmitOption(option: string) {
    console.log("Opción seleccionada:", option);
    mutateContinueStory.mutate({
      storyId: givenParameters.storyId,
      selectedOption: option,
    });
  }
  React.useEffect(() => {
    generateImage.mutate({
      sceneContent: givenParameters.scene.imagePrompt,
      sceneNumber: givenParameters.scene.scene_number,
      storyTitle: givenParameters.storyTitle,
      userLocality: givenParameters.userLocality,
    });
  }, []);

  return (
    <MainLayout className="opacity-80">
      <MainLayoutTitle>Escena 1</MainLayoutTitle>
      <MainLayoutSection>
        <Card className="justify-center">
          <div className="container flex flex-col items-center px-10  justify-center gap-8 md:gap-14 lg:flex-row lg:gap-20">
            {/* Left side - Main content */}
            {loadingImage ? (
              <div className="flex h-64 w-96 items-center justify-center bg-muted">
                <p className="text-muted-foreground">Generando imagen...</p>
              </div>
            ) : (
              <Image
                src={`data:${mimeType};base64,${image}`}
                alt={""}
                width={500}
                height={500}
              />
            )}

            {/* Right side - Features */}
            <div className="relative flex items-center flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
              <DashedLine
                orientation="vertical"
                className="absolute top-0 left-0 max-lg:hidden"
              />
              <DashedLine
                orientation="horizontal"
                className="absolute top-0 lg:hidden"
              />
              <div className="flex flex-col gap-2.5 lg:gap-5">
                <div className="p-6">
                  <MainLayoutSubTitle>{givenParameters.storyTitle}</MainLayoutSubTitle>
                  <p className="text-muted-foreground w-auto text-sm">
                    {getWordContexts(givenParameters.scene.content).map(({ word, context }, index) => (
                      <React.Fragment key={index}>
                        <WordDefinitionModal word={word} context={context} />{" "}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
                <div className="flex p-6 flex-col gap-4">
                  <MainLayoutSubTitle>
                    Opciones de continuación
                  </MainLayoutSubTitle>
                  <div className="flex flex-col items-center  gap-6">
                    {givenParameters.scene.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleSubmitOption(option)}
                        disabled={mutateContinueStory.isPending}
                        className="text-muted-foreground h-auto max-w-2/3  whitespace-normal text-sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </MainLayoutSection>
    </MainLayout>
  );
}
