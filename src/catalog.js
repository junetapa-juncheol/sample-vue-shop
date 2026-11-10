import season from './assets/season.webp';
import rose from './assets/rose.webp';
import tulip from './assets/tulip.webp';
import garden from './assets/garden.webp';

export const products = [
  {
    id: 'season',
    name: '계절을 담은 꽃다발',
    subtitle: 'SEASONAL BOUQUET',
    category: '꽃다발',
    price: 32000,
    image: season,
    alt: '파란 하늘 아래 피어난 노란 계절 꽃',
    tag: '이달의 추천',
    description:
      '그날 가장 싱그러운 계절 꽃을 자연스럽게 엮어요. 소소한 마음을 전하기 좋은 꽃다발입니다.',
  },
  {
    id: 'rose',
    name: '살구빛 로즈 부케',
    subtitle: 'APRICOT ROSE',
    category: '꽃다발',
    price: 38000,
    image: rose,
    alt: '살구빛 장미와 유칼립투스를 엮은 꽃다발',
    tag: 'BEST',
    description:
      '부드러운 살구빛 장미와 은은한 유칼립투스 향. 특별한 날을 위한 차분하고 다정한 선택입니다.',
  },
  {
    id: 'tulip',
    name: '튤립 한 아름',
    subtitle: 'A HANDFUL OF TULIPS',
    category: '한 송이·묶음',
    price: 24000,
    image: tulip,
    alt: '자연광 아래 놓인 분홍 튤립',
    tag: '',
    description:
      '꽃잎이 열리는 모습까지 즐거운 튤립 묶음이에요. 집 안 작은 자리에 봄 같은 기분을 놓아 보세요.',
  },
  {
    id: 'garden',
    name: '작은 정원의 인사',
    subtitle: 'LITTLE GARDEN',
    category: '꽃다발',
    price: 46000,
    image: garden,
    alt: '차분한 회색 배경의 살구빛 꽃 한 송이',
    tag: '소월의 선택',
    description:
      '정원에서 막 꺾어 온 듯 자연스러운 구성. 부드러운 색감으로 일상의 작은 자리를 채워 보세요.',
  },
];

export const money = (value) => `${value.toLocaleString('ko-KR')}원`;
