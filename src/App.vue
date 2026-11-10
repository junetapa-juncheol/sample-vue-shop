<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { money, products } from './catalog';
import ShopIcon from './components/ShopIcon.vue';
import ShopDialog from './components/ShopDialog.vue';
import hero from './assets/rose.webp';

const store = useStore();
const category = ref('전체');
const sort = ref('recommended');
const dialog = ref(null);
const detail = ref(null);
const stage = ref('cart');
const notice = ref('');
const pickupDay = ref('2026-11-11');
const pickupTime = ref('14:00–16:00');
const wrapping = ref(false);
const card = ref('마음을 담아 전해요');
const items = computed(() => store.getters.items);
const count = computed(() => store.getters.count);
const subtotal = computed(() => store.getters.total);
const total = computed(() => subtotal.value + (wrapping.value ? 3000 : 0));
const filtered = computed(() => {
  const result = products.filter(
    (product) =>
      category.value === '전체' || product.category === category.value,
  );
  if (sort.value === 'price-low') result.sort((a, b) => a.price - b.price);
  if (sort.value === 'price-high') result.sort((a, b) => b.price - a.price);
  return result;
});

function add(product) {
  const existing = items.value.find((item) => item.id === product.id);
  if (existing?.quantity === 9) {
    notice.value = '한 상품은 최대 9개까지 담을 수 있어요.';
    return;
  }
  store.commit('add', product.id);
  notice.value = `${product.name}을 장바구니에 담았어요.`;
}
function openCart() {
  stage.value = 'cart';
  dialog.value = 'cart';
}
function closeDialog() {
  dialog.value = null;
}
function quantity(item, change) {
  store.commit('quantity', { id: item.id, quantity: item.quantity + change });
}
function showProduct(product) {
  detail.value = product;
  dialog.value = 'product';
}
</script>

<template>
  <div>
    <a href="#flowers" class="skip-link">상품 목록으로 이동</a>
    <div class="announcement">
      일상에 꽃 한 조각, 마음에는 작은 여유 <span>—</span> 가상 꽃집 소월
    </div>
    <header class="site-header">
      <a class="wordmark" href="#top"
        ><span>소월<span class="wordmark-dot">.</span></span
        ><small>SOWOL FLOWER SHOP</small></a
      >
      <nav aria-label="주 메뉴">
        <a href="#flowers" class="nav-active">계절의 꽃</a
        ><button @click="dialog = 'guide'">주문 안내</button>
      </nav>
      <button class="cart-toggle" @click="openCart">
        <ShopIcon name="bag" :size="19" /><span>장바구니</span
        ><span class="cart-count" data-cy="cart-count">{{ count }}</span>
      </button>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">FLOWERS FOR YOUR EVERYDAY</p>
          <h1 id="hero-title">평범한 하루에,<br />꽃이라는 작은 선물.</h1>
          <p class="hero-description">
            계절의 빛깔을 모아 다정하게 엮습니다.<br />전하고 싶은 마음을 소월의
            꽃으로 만나 보세요.
          </p>
          <a class="hero-link" href="#flowers"
            >오늘의 꽃 둘러보기 <ShopIcon name="arrow" :size="18"
          /></a>
          <div class="hero-bottom">
            <span class="small-flower" aria-hidden="true">✳</span
            ><span>천천히 피어나는<br /><strong>우리의 작은 계절</strong></span>
          </div>
        </div>
        <div class="hero-photo">
          <img
            :src="hero"
            alt="은은한 살구빛 장미와 초록 잎으로 엮은 소월의 꽃다발"
            width="1000"
            height="900"
            fetchpriority="high"
          /><span class="photo-caption">A SMALL GIFT, A GOOD DAY.</span>
          <div class="season-label">
            <span>소월의 계절</span><strong>November</strong
            ><small>2026 COLLECTION</small>
          </div>
        </div>
      </section>

      <section
        id="flowers"
        class="catalog-section"
        aria-labelledby="catalog-heading"
      >
        <div class="catalog-heading">
          <div>
            <p class="eyebrow">OUR SEASONAL PICKS</p>
            <h2 id="catalog-heading">지금, 가장 예쁜 꽃</h2>
          </div>
          <p>소중한 날에도, 아무 날이 아니어도.</p>
        </div>
        <div class="catalog-toolbar">
          <div class="category-tabs" role="group" aria-label="상품 분류">
            <button
              v-for="item in ['전체', '꽃다발', '한 송이·묶음']"
              :key="item"
              :class="{ selected: category === item }"
              :aria-pressed="category === item"
              @click="category = item"
            >
              {{ item }}
            </button>
          </div>
          <label class="sort-label"
            ><span class="sr-only">상품 정렬</span
            ><select v-model="sort" aria-label="상품 정렬">
              <option value="recommended">추천순</option>
              <option value="price-low">낮은 가격순</option>
              <option value="price-high">높은 가격순</option>
            </select></label
          >
        </div>
        <div class="catalog-meta">
          <span>전체 {{ filtered.length }}개의 꽃</span
          ><span>모든 꽃은 매장 픽업으로 만나실 수 있어요.</span>
        </div>
        <div class="product-grid">
          <article
            v-for="product in filtered"
            :key="product.id"
            class="product-card"
            data-cy="product-card"
          >
            <button
              class="product-image"
              :aria-label="`${product.tag} ${product.name} 상세 보기`"
              @click="showProduct(product)"
            >
              <img
                :src="product.image"
                :alt="product.alt"
                width="1000"
                height="900"
                loading="lazy"
              /><span v-if="product.tag" class="product-tag">{{
                product.tag
              }}</span
              ><span class="image-more"
                ><ShopIcon name="plus" :size="20"
              /></span>
            </button>
            <div class="product-info">
              <p class="product-subtitle">{{ product.subtitle }}</p>
              <h3>{{ product.name }}</h3>
              <div class="product-bottom">
                <span>{{ money(product.price) }}</span
                ><button
                  class="add-button"
                  :aria-label="`${product.name} 담기`"
                  :data-cy="`add-${product.id}`"
                  @click="add(product)"
                >
                  <ShopIcon name="plus" :size="16" /><span>담기</span>
                </button>
              </div>
            </div>
          </article>
        </div>
        <div class="shop-note">
          <ShopIcon name="leaf" :size="22" />
          <p>
            꽃은 매일 조금씩 다른 표정을 지어요.<br /><span
              >계절과 수급에 따라 꽃의 구성과 색감이 달라질 수 있습니다.</span
            >
          </p>
          <span class="note-signature">With love, Sowol</span>
        </div>
      </section>

      <section class="pickup-banner">
        <div>
          <p class="eyebrow">A LITTLE NOTE FROM SOWOL</p>
          <h2>
            마음을 고르고,<br class="mobile-only" />
            가볍게 들러 주세요.
          </h2>
          <p>장바구니에서 꽃을 고른 뒤, 픽업 주문서를 미리 확인해 보세요.</p>
        </div>
        <button class="outline-button" @click="dialog = 'guide'">
          주문 안내 보기 <ShopIcon name="arrow" :size="16" />
        </button>
      </section>
    </main>
    <footer class="site-footer">
      <div>
        <a href="#top" class="footer-wordmark">소월.</a>
        <p>계절을 엮고, 마음을 전합니다.</p>
      </div>
      <div class="footer-detail">
        <p>가상 꽃집의 포트폴리오 샘플입니다.</p>
        <p>실제 주문·결제는 진행되지 않습니다.</p>
        <span>© 2026 junetapa · SOWOL</span>
      </div>
    </footer>
    <div class="toast-wrap" role="status" aria-live="polite">
      <div v-if="notice" class="toast">
        <ShopIcon name="check" :size="16" /><span>{{ notice }}</span
        ><button aria-label="알림 닫기" @click="notice = ''">
          <ShopIcon name="close" :size="15" />
        </button>
      </div>
    </div>
    <p v-if="store.state.storageWarning" class="storage-warning" role="status">
      {{ store.state.storageWarning }}
    </p>
    <button v-if="count > 0" class="mobile-cart" @click="openCart">
      <span><ShopIcon name="bag" :size="17" />장바구니 {{ count }}</span
      ><strong
        >{{ money(subtotal) }} <ShopIcon name="arrow" :size="16"
      /></strong>
    </button>

    <ShopDialog
      v-if="dialog"
      :title="
        dialog === 'cart'
          ? stage === 'cart'
            ? '나의 장바구니'
            : '주문서 미리보기'
          : dialog === 'guide'
            ? '소월의 주문 안내'
            : detail.name
      "
      :drawer="dialog === 'cart'"
      @close="closeDialog"
    >
      <template v-if="dialog === 'cart'">
        <p class="drawer-intro">
          {{
            stage === 'cart'
              ? '마음을 전할 꽃을 골라 보세요.'
              : '선택한 꽃과 픽업 내용을 확인해 주세요.'
          }}
        </p>
        <div v-if="items.length === 0" class="empty-cart">
          <ShopIcon name="bag" :size="42" />
          <h3>아직 담은 꽃이 없어요</h3>
          <p>마음에 드는 꽃을 장바구니에 담아 주세요.</p>
          <button class="solid-button" @click="closeDialog">
            계절의 꽃 둘러보기
          </button>
        </div>
        <template v-else>
          <div class="cart-items">
            <article
              v-for="item in items"
              :key="item.id"
              class="cart-item"
              data-cy="cart-item"
            >
              <img :src="item.image" :alt="item.alt" width="80" height="90" />
              <div class="cart-item-info">
                <h3>{{ item.name }}</h3>
                <span>{{ money(item.price) }}</span>
                <div v-if="stage === 'cart'" class="quantity-control">
                  <button
                    :aria-label="`${item.name} 수량 줄이기`"
                    @click="quantity(item, -1)"
                  >
                    <ShopIcon name="minus" :size="12" /></button
                  ><span :aria-label="`${item.name} 수량`" data-cy="quantity">{{
                    item.quantity
                  }}</span
                  ><button
                    :aria-label="`${item.name} 수량 늘리기`"
                    :disabled="item.quantity >= 9"
                    @click="quantity(item, 1)"
                  >
                    <ShopIcon name="plus" :size="12" />
                  </button>
                </div>
                <span v-else class="preview-quantity"
                  >{{ item.quantity }}개 ·
                  {{ money(item.price * item.quantity) }}</span
                >
              </div>
              <button
                v-if="stage === 'cart'"
                class="remove-item"
                :aria-label="`${item.name} 삭제`"
                @click="store.commit('remove', item.id)"
              >
                <ShopIcon name="close" :size="15" />
              </button>
            </article>
          </div>
          <form
            v-if="stage === 'cart'"
            class="pickup-form"
            @submit.prevent="stage = 'preview'"
          >
            <h3>픽업 옵션</h3>
            <div class="form-grid">
              <label
                >픽업 날짜<select
                  v-model="pickupDay"
                  name="pickup-date"
                  required
                >
                  <option value="2026-11-11">11월 11일 (수)</option>
                  <option value="2026-11-12">11월 12일 (목)</option>
                  <option value="2026-11-13">11월 13일 (금)</option>
                </select></label
              ><label
                >픽업 시간<select
                  v-model="pickupTime"
                  name="pickup-time"
                  required
                >
                  <option>11:00–13:00</option>
                  <option>14:00–16:00</option>
                  <option>16:00–18:00</option>
                </select></label
              >
            </div>
            <label class="wrapping-option"
              ><input v-model="wrapping" type="checkbox" />선물 포장 추가<span
                >+3,000원 / 주문당</span
              ></label
            ><label
              >메시지 카드<select v-model="card" name="message">
                <option>마음을 담아 전해요</option>
                <option>생일을 축하해요</option>
                <option>늘 고마워요</option>
                <option>카드 없이 준비해 주세요</option>
              </select></label
            >
            <p class="demo-note">
              체험용 픽업 일정입니다. 개인정보를 입력받지 않습니다.
            </p>
            <div class="cart-totals">
              <div>
                <span>상품 금액</span><span>{{ money(subtotal) }}</span>
              </div>
              <div>
                <span>선물 포장</span
                ><span>{{ money(wrapping ? 3000 : 0) }}</span>
              </div>
              <div class="grand-total">
                <strong>합계</strong
                ><strong data-cy="cart-total">{{ money(total) }}</strong>
              </div>
            </div>
            <button
              type="submit"
              class="solid-button wide"
              data-cy="preview-order"
            >
              주문서 미리보기 <ShopIcon name="arrow" :size="18" />
            </button>
            <p class="demo-note centered">
              실제 주문·결제는 진행되지 않습니다.
            </p>
          </form>
          <div v-else class="order-preview" data-cy="order-preview">
            <div class="preview-badge">
              <ShopIcon name="check" :size="17" />주문 전 확인용 미리보기
            </div>
            <dl>
              <div>
                <dt>픽업 날짜</dt>
                <dd>{{ pickupDay }}</dd>
              </div>
              <div>
                <dt>픽업 시간</dt>
                <dd>{{ pickupTime }}</dd>
              </div>
              <div>
                <dt>선물 포장</dt>
                <dd>{{ wrapping ? '추가 / 3,000원' : '기본 포장' }}</dd>
              </div>
              <div>
                <dt>메시지 카드</dt>
                <dd>{{ card }}</dd>
              </div>
            </dl>
            <div class="preview-total">
              <span>총 {{ count }}개 · 합계</span
              ><strong data-cy="preview-total">{{ money(total) }}</strong>
            </div>
            <p class="preview-note">
              꽃을 고르는 경험을 위한 가상 주문서입니다.<br />주문 정보는
              전송되지 않습니다.
            </p>
            <button class="solid-button wide" @click="stage = 'cart'">
              장바구니로 돌아가기</button
            ><button class="text-button centered" @click="closeDialog">
              상품 더 둘러보기
            </button>
          </div>
        </template>
      </template>
      <div v-else-if="dialog === 'guide'" class="guide-copy">
        <p class="eyebrow">HOW TO MEET YOUR FLOWERS</p>
        <ol>
          <li>
            <strong>마음에 드는 꽃을 골라요.</strong>
            <p>
              상품을 담고 장바구니에서 수량을 조절해 주세요. 상품별 최대 수량은
              9개입니다.
            </p>
          </li>
          <li>
            <strong>픽업 옵션을 선택해요.</strong>
            <p>
              체험용 날짜와 시간, 포장, 메시지 카드를 골라 주문서를 미리 볼 수
              있습니다.
            </p>
          </li>
          <li>
            <strong>계절의 차이를 즐겨 주세요.</strong>
            <p>
              사진은 꽃의 분위기를 보여 주는 참고 이미지입니다. 이곳은 실제
              판매를 하지 않는 가상 꽃집입니다.
            </p>
          </li>
        </ol>
        <p class="demo-note">
          장바구니는 현재 브라우저에 저장됩니다. 이름·연락처·주소를 입력하지
          않습니다.
        </p>
      </div>
      <div v-else class="product-detail">
        <img :src="detail.image" :alt="detail.alt" width="1000" height="900" />
        <p class="eyebrow">{{ detail.subtitle }}</p>
        <p>{{ detail.description }}</p>
        <div>
          <strong>{{ money(detail.price) }}</strong
          ><button class="solid-button" @click="add(detail)">
            장바구니 담기 <ShopIcon name="plus" :size="16" />
          </button>
        </div>
      </div>
    </ShopDialog>
  </div>
</template>
