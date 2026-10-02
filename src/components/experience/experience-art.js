// Native-canvas glass trace preserves the original illustrated frame and fingers.
export const experienceArt = {
  character: '/assets/img/experience/archel-stats.webp',
  mirror: { mask: '/assets/img/experience/mirror-glass.svg', left: '0%', top: '0%', width: '100%', aspectRatio: '1536 / 1024' },
  // mirror: { mask, frame, glare?, foreground?, left, top, width, aspectRatio }
  // left/top/width are CSS percentages relative to the un-cropped character canvas.
};

// The mirror occupies only a fraction of the screen. Keep its decode/raster cost
// bounded without changing the original photographs used by other sections.
const reflectionPhotos = new Set(['tiket', 'monash', 'nottingham', 'binus']);
export const reflectionSource = item => reflectionPhotos.has(item.id)
  ? `/assets/img/experience/reflections/${item.id}.webp`
  : item.reflectionImage;
