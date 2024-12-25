import data from '../assets/data/new-data.json';
import { useModalStore } from '../store/modal-store';

export const useShareTheme = () => {
  const { selectedDate, selectedTime } = useModalStore();

  function shareToKakao(id: string) {
    const targetItem = data.find((i) => i.id === id);
    const date = selectedDate.format('YYYY-MM-DD');
    const time = selectedTime.format('HH:mm');
    if (!targetItem) return;

    const imageUrl = `https://kujarung.github.io/official-escape-time/assets/theme-img/thumb_${targetItem.id}.jpg`;

    Kakao.Share.sendDefault({
      objectType: 'location',
      address: targetItem.address,
      addressTitle: targetItem.branchName,
      content: {
        title: `방탈출 ${targetItem.title} 어때?`,
        description: `${targetItem.branchName}${targetItem.location} ${date} ${time}`,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
          webUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
        },
      },
      buttons: [
        {
          title: '테마 보기',
          link: {
            mobileWebUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
            webUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
          },
        },
      ],
    });
  }

  return { shareToKakao };
};
