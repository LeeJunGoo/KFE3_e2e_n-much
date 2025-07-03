'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/components/ui/dialog';
import { useState } from 'react';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import UserAvatar from 'src/components/common/UserAvatar';
import { EpisodeItemProps } from 'src/types/episodes';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/utils/maskEmail';

const EpisodeMoreButton = ({ episode, userInfo }: { episode: EpisodeItemProps; userInfo: UserInfoType }) => {
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);
  const [selectedEpisodes, setSelectedEpisodes] = useState<EpisodeItemProps>();
  const userNickname = episode.buyer.nickname ?? userInfo.social_name;

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
                    <p className="text-sm text-(--color-text-base)">{userNickname}</p>
                    <p className="text-xs text-(--color-warm-gray)">&#40;{maskEmail(episode.buyer.email)}&#41;</p>
                  </div>
                  <p className="text-xs text-(--color-warm-gray)">{formatToKoreanDateTime(episode.created_at)}</p>
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1F1F25]">{episode.title}</h3>
              <p className="mb-6 text-sm leading-relaxed whitespace-pre-line text-(--color-warm-gray)">
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
