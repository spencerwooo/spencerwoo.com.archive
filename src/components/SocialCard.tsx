import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { SocialProps } from '../config/socials'

const SocialCard = (props: SocialProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [stat, setStat] = useState(0)
  const nodeRef = useRef(null)

  useEffect(() => {
    axios
      .get(props.apiUrl)
      .then(
        ({
          data: {
            data: { totalSubs },
          },
        }) => {
          setStat(totalSubs)
          setIsLoading(false)
        }
      )
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm space-x-2">
      {props.icon && <props.icon className="w-4 h-4" />}
      <div>{props.name}</div>
      <SwitchTransition>
        <CSSTransition
          key={isLoading ? 'loading' : 'loaded'}
          timeout={200}
          classNames="fade"
          nodeRef={nodeRef}
          unmountOnExit
        >
          {isLoading ? (
            <span ref={nodeRef}>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          ) : (
            <span ref={nodeRef}>{stat}</span>
          )}
        </CSSTransition>
      </SwitchTransition>
    </a>
  )
}

export default SocialCard
