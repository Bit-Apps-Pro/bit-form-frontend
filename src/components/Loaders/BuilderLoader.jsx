import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'

const BuilderLoader = () => {
  const { css } = useFela()

  return (
    <div title="Loading..." className={css({ gap: 15, p: '20px 10px', mxw: 1500, m: 'auto' }, ut.flxb, ut.mb2)}>
      <div className={css({ w: '10%' })}>
        <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
          <div title="Loading..." className={`loader ${css({ w: 89, h: 16 })}`} />
          <div title="Loading..." className={`loader ${css({ w: 16, h: 16, brs: 16 })}`} />
        </div>
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: 143, h: 30, brs: 8 }, ut.mb2)}`} />
      </div>
      <div className={css({ w: '65%' })}>
        <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
          <div title="Loading..." className={`loader ${css({ w: 500, h: 80 }, ut.mr2)}`} />
          <div title="Loading..." className={`loader ${css({ w: 500, h: 80 })}`} />
        </div>
        <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
          <div title="Loading..." className={`loader ${css({ w: 660, h: 80 }, ut.mr2)}`} />
          <div title="Loading..." className={`loader ${css({ w: 342, h: 80 })}`} />
        </div>
        <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
          <div title="Loading..." className={`loader ${css({ w: 420, h: 80 }, ut.mr2)}`} />
          <div title="Loading..." className={`loader ${css({ w: 580, h: 80 })}`} />
        </div>
        <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
          <div title="Loading..." className={`loader ${css({ w: 244, h: 80 }, ut.mr2)}`} />
          <div title="Loading..." className={`loader ${css({ w: 754, h: 80 })}`} />
        </div>
        <div title="Loading..." className={css({ dy: 'flex', jc: 'flex-end' }, ut.mb2)}>
          <div title="Loading..." className={`loader ${css({ w: 122, h: 36, brs: 5 }, ut.mr2)}`} />
          <div title="Loading..." className={`loader ${css({ w: 143, h: 36, brs: 5 })}`} />
        </div>
      </div>
      <div className={css({ w: '20%' })}>
        <div title="Loading..." className={`loader ${css({ w: 147, h: 25 }, ut.mb2)}`} />
        <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
          <div title="Loading..." className={`loader ${css({ w: 199, h: 39, brs: 5 })}`} />
          <div title="Loading..." className={`loader ${css({ w: 40, h: 40, brs: 40 })}`} />
        </div>
        <div title="Loading..." className={css(ut.flxcb, ut.mb4)}>
          <div title="Loading..." className={`loader ${css({ w: 199, h: 39, brs: 5 })}`} />
          <div title="Loading..." className={`loader ${css({ w: 40, h: 40, brs: 40 })}`} />
        </div>
        <div title="Loading..." className={`loader ${css({ w: '100%', h: 47, brs: 30 }, ut.mb2)}`} />
        <div title="Loading..." className={`loader ${css({ w: '100%', h: 47, brs: 30 })}`} />
      </div>
    </div>
  )
}

export default BuilderLoader
