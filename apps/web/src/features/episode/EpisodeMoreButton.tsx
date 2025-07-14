'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/components/ui/dialog';
import UserAvatar from 'src/shared/ui/UserAvatar';
import { formatToKoreanDateTime } from 'src/shared/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/shared/utils/maskEmail';
import type { UserInfoType } from 'src/app/api/auth/user-info/route';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeMoreButton = ({ episode, userInfo }: { episode: EpisodeItemProps; userInfo: UserInfoType }) => {
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);
  const [selectedEpisodes, setSelectedEpisodes] = useState<EpisodeItemProps>();
  const userNickname = episode.buyer.nickname ?? userInfo.social_name;

  return (
    <>
      <button
        className="text-(--color-accent) cursor-pointer text-xs"
        onClick={() => {
          setSelectedEpisodes(episode);
          setShowStoryModal(true);
        }}
      >
        더보기
      </button>

      <Dialog open={showStoryModal} onOpenChange={setShowStoryModal}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="mb-4 text-center text-lg font-bold">사연 상세</DialogTitle>
          </DialogHeader>

          {selectedEpisodes && (
            <div className="py-4">
              <div className="mb-4 flex items-center">
                <UserAvatar src={episode.buyer.avatar!} alt={userNickname} size="sm" />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-(--color-text-base) text-sm">{userNickname}</p>
                    <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(episode.buyer.email)}&#41;</p>
                  </div>
                  <p className="text-(--color-warm-gray) text-xs">{formatToKoreanDateTime(episode.created_at)}</p>
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1F1F25]">{episode.title}</h3>
              <p className="text-(--color-warm-gray) mb-6 whitespace-pre-line text-sm leading-relaxed">
                {episode.description}
              </p>
            </div>
          )}
          <Button
            className="!rounded-button bg-(--color-accent) hover:bg-(--color-primary) w-full text-white"
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
