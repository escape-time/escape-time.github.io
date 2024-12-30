import data from '../assets/data/new-data.json';
import { useModalStore } from '../store/modal-store';

export const useShareTheme = () => {
  const { selectedDate, selectedTime } = useModalStore();

  function shareThemeToKakao(id: string) {
    const targetItem = data.find((i) => i.id === id);
    const date = selectedDate.format('YYYY-MM-DD');
    const time = selectedTime.format('HH:mm');
    if (!targetItem) return;

    const imageUrl = `https://escape-time.github.io/assets/theme-img/thumb_${targetItem.id}.jpg`;

    Kakao.Share.sendDefault({
      objectType: 'location',
      address: targetItem.address,
      addressTitle: targetItem.branchName,
      content: {
        title: `방탈출 ${targetItem.title} 어때?`,
        description: `${targetItem.branchName}${targetItem.location} ${date} ${time}`,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: `https://escape-time.github.io/#/details/${targetItem.id}`,
          webUrl: `https://escape-time.github.io/#/details/${targetItem.id}`,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '테마 보기',
          link: {
            mobileWebUrl: `https://escape-time.github.io/#/details/${targetItem.id}`,
            webUrl: `https://escape-time.github.io/#/details/${targetItem.id}`,
          },
        },
      ],
    });
  }

  function requestWriteReview(themeId: string, reviewId: string) {
    const targetItem = data.find((i) => i.id === themeId);
    if (!targetItem) return;

    const imageUrl = `https://escape-time.github.io/assets/theme-img/thumb_${themeId}.jpg`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `친구의 리뷰에 댓글을 달아주세요!`,
        description: `${targetItem.title} 어떠셨나요? \n 친구의 리뷰에 댓글을 달아주세요!`,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: `https://escape-time.github.io/#/details/${reviewId}`,
          webUrl: `https://escape-time.github.io/#/details/${reviewId}`,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '리뷰 보기',
          link: {
            mobileWebUrl: `https://escape-time.github.io/#/review/${reviewId}`,
            webUrl: `https://escape-time.github.io/#/review/${reviewId}`,
          },
        },
      ],
    });
  }

  return { shareThemeToKakao, requestWriteReview };
};
