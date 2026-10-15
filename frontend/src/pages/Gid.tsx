export default function Gid({
  onBack,
  onEnter,
}: {
  onBack: () => void;
  onEnter: (tab: any) => void;
}) {
  const steps: { n: string; t: string; d: string; tab: any; btn: string }[] = [
    {
      n: '01', t: 'Склад', tab: 'dash', btn: 'Открыть склад',
      d: 'Сколько датчиков в наличии, сколько свободно, сколько в брони. Это витрина живых цифр.',
    },
    {
      n: '02', t: 'Заказы', tab: 'orders', btn: 'Открыть заказы',
      d: 'Создайте заказ, забронируйте товар, подтвердите отгрузку — всё в один клик.',
    },
    {
      n: '03', t: 'Задержка', tab: 'scenario', btn: 'Проверить задержку',
      d: 'Перенесите поставку на другую дату — увидите было / стало и заказы с возможными рисками. Склад не меняется.',
    },
    {
      n: '04', t: 'ИИ-консультант', tab: 'consult', btn: 'Спросить ИИ',
      d: 'Спросите своими словами: отвечает по данным, с номерами заказов и цифрами.',
    },
    {
      n: '05', t: 'Производство', tab: 'prod', btn: 'Открыть производство',
      d: 'Хватит ли деталей на партию и когда она будет готова.',
    },
  ];

  return (
    <div className="fc-app">
      <div className="fc-body">
        <section className="fc-section" style={{ paddingTop: 32 }}>
          <button className="btn-ghost" onClick={onBack} style={{ marginBottom: 18 }}>← На главную</button>
          <div className="fc-section-label">Гид · 3 минуты</div>
          <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
            Что умеет <em style={{ fontStyle: 'normal', color: 'var(--primary-soft)' }}>двойник</em>
          </h2>
          <p style={{ color: 'var(--muted-fg)', maxWidth: 640, fontWeight: 300 }}>
            Нажимайте на шаги — откроется нужный раздел живого приложения.
            Все цифры настоящие: сайт читает их с сервера.
          </p>
          <div className="fc-plans" style={{ marginTop: 24 }}>
            {steps.map((s) => (
              <div key={s.n} className="fc-plan as-tab" role="button" tabIndex={0}
                onClick={() => onEnter(s.tab)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onEnter(s.tab); }}>
                <div className="fc-path-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p style={{ color: 'var(--muted-fg)', fontSize: 13.5, fontWeight: 300 }}>{s.d}</p>
                <span className="fc-link-more">{s.btn} <span className="arr">→</span></span>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h3><span className="n">✦</span> Как это работает</h3>
            <div className="muted">
              Сайт показывает данные сервера, а не картинки. Проверка задержки считается
              на копии — ничего не ломается. Нейросеть отвечает только по данным
              и честно говорит «такой записи нет», если чего-то не знает.
            </div>
          </div>

          <div className="card" style={{ marginTop: 16, textAlign: 'center' }}>
            <h3><span className="n">✦</span> Поделиться гидом</h3>
            <div className="muted">Наведите камеру телефона — откроется эта страница.</div>
            <img src="./qr-gid.png" alt="QR-код на гид" style={{ width: 200, height: 200, marginTop: 12, borderRadius: 12 }} />
          </div>
        </section>
      </div>
    </div>
  );
}
