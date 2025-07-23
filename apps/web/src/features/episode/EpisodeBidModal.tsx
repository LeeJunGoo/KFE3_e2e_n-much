'use client';

import { useEffect, useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Input } from '@repo/ui/components/ui/input';
import { toast } from '@repo/ui/components/ui/sonner';
import { FiAward } from 'react-icons/fi';
import { fetchUpdateEpisodeBid } from 'src/entities/episode/api';
import { formatNumber } from 'src/shared/utils/formatNumber';
import type { EpisodeItemProps } from 'src/entities/episode/types';
import EpisodeBidButton from './EpisodeBidButton';
import EpisodeBidModalForm from './EpisodeBidModalForm';

const EpisodeBidModal = ({ episode }: { episode: EpisodeItemProps }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <EpisodeBidButton
            onClick={() => {
              setOpen(true);
            }}
            variant="active"
            className="bg-[#8E74F9] text-xs hover:bg-[#3f3562]"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="mb-4 text-center text-lg font-bold">{episode.title}</DialogTitle>
          </DialogHeader>
          <EpisodeBidModalForm episode={episode} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EpisodeBidModal;
