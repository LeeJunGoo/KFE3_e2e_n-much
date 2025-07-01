'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/components/ui/dialog';
import { useState } from 'react';
import { EpisodeItemProps } from 'src/types/episodes';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/utils/maskEmail';

const EpisodeMoreButton = ({ episode }: { episode: EpisodeItemProps }) => {
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);
  const [selectedEpisodes, setSelectedEpisodes] = useState<EpisodeItemProps>();
  return (
    <>
      <button
        className="cursor-pointer text-xs text-(--color-accent)"
        onClick={() => {
          setSelectedEpisodes(episode);
          setShowStoryModal(true);
        }}
      >
        더보기
      </button>

      <Dialog open={showStoryModal} onOpenChange={setShowStoryModal}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="mb-4 text-center text-lg font-bold">사연 상세</DialogTitle>
          </DialogHeader>

          {selectedEpisodes && (
            <div className="py-4">
              <div className="mb-4 flex items-center">
                <Avatar className="mr-3 h-12 w-12">
                  <AvatarImage src={episode.buyer.avatar!} alt={episode.buyer.nickname!} />
                  {/* //FIXME - 기본 아타바로 변경해야합니다. */}
                  <AvatarFallback>{'아바타가 존재하지 않습니다.'}</AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-medium text-(--color-text-base)">{episode.buyer.nickname}</p>
                    <p className="text-xs text-(--color-warm-gray)">&#40;{maskEmail(episode.buyer.email)}&#41;</p>
                  </div>
                  <p className="text-xs text-(--color-warm-gray)">{formatToKoreanDateTime(episode.created_at)}</p>
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1F1F25]">{episode.title}</h3>
              <p className="mb-6 text-sm leading-relaxed whitespace-pre-line text-(--color-warm-gray)">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas laudantium nam at dolorem vel
                asperiores saepe animi eligendi blanditiis repudiandae ad eum porro, velit perferendis repellendus
                aliquam fugit autem incidunt.
                {episode.description}
              </p>
            </div>
          )}
          <Button
            className="!rounded-button w-full bg-(--color-accent) text-white hover:bg-(--color-primary)"
            onClick={() => setShowStoryModal(false)}
          >
            닫기
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EpisodeMoreButton;
