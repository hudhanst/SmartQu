import React, { } from 'react'

// import { Link as GoTo } from 'react-router-dom'

import {
    useTheme,
    Link as GoTo,
} from '@material-ui/core'
import { MUI_VerticalMargin } from '../../../MUI'

import { useSpring, animated } from 'react-spring'

const PaperMenu = (props) => {
    const [conf, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 500, friction: 100 } }))
    const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
    const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    const Theme = useTheme()
    const ThemeTextPrimary = Theme.palette.text.primary
    const ThemeBackgroundPaper = Theme.palette.background.paper

    return (
        <center>
            <GoTo
                href={props.Url ? props.Url : '/PageNotFound'}
                // to={props.Url ? props.Url : '/PageNotFound'}
                style={{ textDecoration: 'none', color: ThemeTextPrimary }}
            >
                <animated.div
                    onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                    onMouseLeave={() => set({ xys: [0, 0, 1] })}
                    // className='MenuPaperHover'
                    style={{
                        ...{ border: 'none', backgroundColor: ThemeBackgroundPaper, height: '180px', width: '180px', padding: '1%', borderRadius: 15, boxShadow: '2px 0 10px -3px #010101', marginRight: '1vw', marginLeft: '1vw' },
                        ...MUI_VerticalMargin,
                        ...props.AdditionalStyle ? props.AdditionalStyle : {},
                        // ...{ backgroundSize: 'cover', backgroundPosition: 'center center', transition: 'box - shadow 0.5s', willChange: 'transform', },
                        ...{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' },
                        ...{ transform: props.isDisableAnimation ? '' : conf.xys.interpolate(trans) }
                    }}
                >
                    <div
                        style={{
                            ...{ border: 'none', backgroundColor: 'transparent', paddingTop: '30%', color: ThemeTextPrimary },
                            ...{ transform: 'translateZ(20px)' }
                        }}
                    >
                        <center>
                            {props.Icon ?
                                props.Icon
                                :
                                'Icon'
                            }
                            <br />
                            {props.Title ?
                                props.Title
                                :
                                'Title'
                            }
                        </center>
                    </div>
                </animated.div>
            </GoTo>
        </center>

    )
}

export default PaperMenu