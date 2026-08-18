import { renderHook } from '@testing-library/react';
import gsap from 'gsap';
import { useVideoZoom } from '@/hooks/useVideoZoom';

jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  to: jest.fn(),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: (callback: () => void) => callback(),
}));

describe('useVideoZoom', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    document.body.innerHTML = `
      <div class="project-item">
        <div class="video-wrapper">
          <img class="project-video" src="test.mp4" />
        </div>
      </div>
    `;
  });

  it('正常系：対象要素が存在する場合、正しく gsap.to が呼ばれること', () => {
    renderHook(() => useVideoZoom('.project-item', '.project-video'));

    expect(gsap.to).toHaveBeenCalledTimes(1);
    expect(gsap.to).toHaveBeenCalledWith(
      expect.any(Element),
      expect.objectContaining({
        scale: 1.8,
        ease: 'none',
        scrollTrigger: expect.objectContaining({
          start: 'top top',
          end: '+=500',
          scrub: true,
          pin: true,
        }),
      }),
    );
  });
  it('異常系：video要素が存在しない場合、gsap.to が呼ばれないこと', () => {
    document.body.innerHTML = `
      <div class="project-item">
        <div class="video-wrapper">
        </div>
      </div>
    `;

    renderHook(() => useVideoZoom('.project-item', '.project-video'));

    expect(gsap.to).not.toHaveBeenCalled();
  });

  it('異常系：.video-wrapper が存在しない場合、gsap.to が呼ばれないこと', () => {
    document.body.innerHTML = `
    <div class="project-item">
      <img class="project-video" src="test.mp4" />
    </div>
  `;

    renderHook(() => useVideoZoom('.project-item', '.project-video'));

    expect(gsap.to).not.toHaveBeenCalled();
  });
});
