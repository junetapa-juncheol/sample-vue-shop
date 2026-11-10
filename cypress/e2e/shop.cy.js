describe('계절 꽃 주문 경험', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('분류와 가격 정렬로 상품을 찾는다', () => {
    cy.contains('button', '한 송이·묶음').click();
    cy.get('[data-cy=product-card]')
      .should('have.length', 1)
      .and('contain', '튤립 한 아름');
    cy.contains('button', '전체').click();
    cy.get('select[aria-label="상품 정렬"]').select('price-low');
    cy.get('[data-cy=product-card]').first().should('contain', '튤립 한 아름');
    cy.get('select[aria-label="상품 정렬"]').select('price-high');
    cy.get('[data-cy=product-card]')
      .first()
      .should('contain', '작은 정원의 인사');
  });

  it('수량과 포장을 합산하고 주문서를 미리 본다', () => {
    cy.get('[data-cy=add-season]').click();
    cy.get('[data-cy=add-rose]').click();
    cy.get('.cart-toggle').click();
    cy.get('button[aria-label="계절을 담은 꽃다발 수량 늘리기"]').click();
    cy.get('[data-cy=cart-total]').should('have.text', '102,000원');
    cy.get('input[type=checkbox]').check();
    cy.get('[data-cy=cart-total]').should('have.text', '105,000원');
    cy.get('select[name=pickup-date]').select('2026-11-12');
    cy.get('select[name=pickup-time]').select('16:00–18:00');
    cy.get('select[name=message]').select('늘 고마워요');
    cy.get('[data-cy=preview-order]').click();
    cy.get('[data-cy=order-preview]')
      .should('contain', '2026-11-12')
      .and('contain', '16:00–18:00')
      .and('contain', '늘 고마워요');
    cy.get('[data-cy=preview-total]').should('have.text', '105,000원');
    cy.contains('button', '장바구니로 돌아가기').click();
    cy.get('[data-cy=cart-item]').should('have.length', 2);
  });

  it('새로고침 후 장바구니를 복구하고 상품을 지운다', () => {
    cy.get('[data-cy=add-tulip]').click().click();
    cy.reload();
    cy.get('[data-cy=cart-count]').should('have.text', '2');
    cy.get('.cart-toggle').click();
    cy.get('[data-cy=quantity]').should('have.text', '2');
    cy.get('button[aria-label="튤립 한 아름 수량 줄이기"]').click().click();
    cy.contains('아직 담은 꽃이 없어요').should('be.visible');
    cy.get('[data-cy=preview-order]').should('not.exist');
  });

  it('최대 수량을 제한하고 다른 상품 삭제를 반영한다', () => {
    for (let index = 0; index < 10; index += 1)
      cy.get('[data-cy=add-season]').click();
    cy.get('[data-cy=add-rose]').click();
    cy.get('[data-cy=cart-count]').should('have.text', '10');
    cy.get('.cart-toggle').click();
    cy.get('button[aria-label="계절을 담은 꽃다발 수량 늘리기"]').should(
      'be.disabled',
    );
    cy.get('button[aria-label="살구빛 로즈 부케 삭제"]').click();
    cy.get('[data-cy=cart-total]').should('have.text', '288,000원');
  });

  it('390px에서 상품을 담고 키보드로 대화상자를 닫는다', () => {
    cy.viewport(390, 844);
    cy.get('[data-cy=add-garden]').click();
    cy.get('.mobile-cart').should('be.visible').click();
    cy.get('[role=dialog]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[role=dialog]').should('not.exist');
    cy.document().then((doc) => {
      expect(doc.documentElement.scrollWidth).to.be.at.most(390);
    });
  });

  it('잘못된 저장 데이터에도 상품 목록을 연다', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'sowol-cart-v1',
          '[{"id":"missing","quantity":2}]',
        );
      },
    });
    cy.get('[data-cy=cart-count]').should('have.text', '0');
    cy.contains('저장된 장바구니를 읽을 수 없어').should('be.visible');
    cy.get('[data-cy=product-card]').should('have.length', 4);
  });
});
