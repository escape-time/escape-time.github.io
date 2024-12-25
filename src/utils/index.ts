export const formatKoreanCurrency = (amount: number): string => {
  if (!amount) return '0원';

  // 1000 미만의 숫자 처리
  if (amount < 1000) {
    return `${amount}원`;
  }

  const units = ['', '만', '억', '조'];
  const numbers = amount.toString().split('').reverse();
  const chunks: string[] = [];

  // 4자리씩 묶기
  for (let i = 0; i < numbers.length; i += 4) {
    chunks.push(
      numbers
        .slice(i, i + 4)
        .reverse()
        .join('')
    );
  }

  // 각 단위별 처리
  const result =
    chunks
      .map((chunk, index) => {
        const value = parseInt(chunk);
        if (value === 0) return ''; // 0이면 해당 단위 생략

        // 천 단위 처리
        if (index === 0 && value < 1000) {
          if (value >= 100) {
            return `${Math.floor(value / 100)}백${value % 100 > 0 ? value % 100 : ''}`;
          } else {
            return value.toString();
          }
        }

        // 1만 이상의 단위 처리
        let formatted = '';
        if (value >= 1000) formatted += `${Math.floor(value / 1000)}천`;
        if (value % 1000 >= 100) formatted += `${Math.floor((value % 1000) / 100)}백`;
        if (value % 100 > 0) formatted += value % 100;

        return `${formatted}${units[index]}`;
      })
      .reverse()
      .filter(Boolean)
      .join(' ') + '원';

  return result;
};
