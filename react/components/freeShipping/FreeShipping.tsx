import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Progress } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { FreeShippingProps } from '../../typings/free-shipping'

/**
 * Modifiers of each of the component classes allow you to style each of the blocks
 */
const CSS_HANDLES = [
  'fs_globalFreeShippingContainer',
  'fs_informativeFreeShippingText',
  'fs_informativeFreeShippingTextInner',
  'fs_informativeFreeShippingTextSpace',
  'fs_freeShippingProgressBar',
  'fs_rangeFreeShippingContainer',
  'fs_initialRangeFreeShippingText',
  'fs_endRangeFreeShippingText',
] as const

const FreeShipping: StorefrontFunctionComponent<FreeShippingProps> = ({
  valueOfFreeShipping,
  infoLabel,
  show,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  // Get subTotal of my cart that is equal to the sum of the prices of the items in the cart
  const {
    orderForm: {value},
  } = useOrderForm()
  // console.log(orderForm);
  
  
  const [missingForFreeShipping, setMissingForFreeShipping] = useState(0)
  const [percentageForFreeShipping, setPercentageForFreeShipping] = useState(1)

  let subTotal = value / 100

  useEffect(() => {
    setMissingForFreeShipping(
      valueOfFreeShipping - subTotal <= 0 ? 0 : valueOfFreeShipping - subTotal
    )
    setPercentageForFreeShipping(
      (subTotal * 100) / valueOfFreeShipping > 100
        ? 100
        : (subTotal * 100) / valueOfFreeShipping
    )
  }, [subTotal])

  console.log(valueOfFreeShipping);
  console.log(subTotal);
  console.log(missingForFreeShipping);
  console.log(percentageForFreeShipping);
  
  return (
    <div>
      {show.freeShippingComponent && (
        <div className={`w-90 pa3 ${handles.fs_globalFreeShippingContainer}`}>
        {show.informativeFreeShippingText && (
          <p className={`t-body mw9 mw-100 ${handles.fs_informativeFreeShippingText}`}>
            {show.labelInitial && (
              <span className={`${handles.fs_informativeFreeShippingTextInner}`}>
                {show.labelInitial && percentageForFreeShipping < 100 && infoLabel.labelInitial}
                <i className={`${handles.fs_informativeFreeShippingTextSpace}`}>&nbsp;</i>
              </span>
            )}
            {show.subTotal && percentageForFreeShipping < 100 && (
              <FormattedCurrency value={subTotal} />
            )}
            {show.labelBetween && (
              <span className={`${handles.fs_informativeFreeShippingTextInner}`}>
                {show.labelBetween && percentageForFreeShipping < 100 && infoLabel.labelBetween}
                <i className={`${handles.fs_informativeFreeShippingTextSpace}`}>&nbsp;</i>
              </span>
            )}
            {show.missingForFreeShipping && percentageForFreeShipping < 100 && (
              <FormattedCurrency value={missingForFreeShipping} />
            )}
            {show.labelFinal && (
              <span className={`${handles.fs_informativeFreeShippingTextInner}`}>
                <i className={`${handles.fs_informativeFreeShippingTextSpace}`}>&nbsp;</i>
                {show.labelFinal && percentageForFreeShipping < 100 && infoLabel.labelFinal}
              </span>
            )}
            {show.labelFreeShippingComplete && (
              <span className={`${handles.fs_informativeFreeShippingTextInner}`}>
                <i className={`${handles.fs_informativeFreeShippingTextSpace}`}>&nbsp;</i>
                {show.labelFreeShippingComplete && percentageForFreeShipping === 100 && infoLabel.labelFreeShippingComplete}
              </span>
            )}
          </p>
        )}
        {show.rangeFreeShipping && (
          <div
            className={`flex flex-wrap items-center justify-between pa2 ${handles.fs_rangeFreeShippingContainer}`}
          >
            {show.percentageFreeShipping && (
              <Progress
                type="line"
                percent={percentageForFreeShipping}
                className={`mw-100 ${handles.fs_freeShippingProgressBar}`}
              />
            )}
            <p
              className={`t-body mw9 self-start ${handles.fs_initialRangeFreeShippingText}`}
            >
              {' '}
              <FormattedCurrency value={0} />{' '}
            </p>
            <p
              className={`t-body mw9 self-end ${handles.fs_endRangeFreeShippingText}`}
            >
              {' '}
              <FormattedCurrency value={valueOfFreeShipping} />{' '}
            </p>
          </div>
        )}
      </div>
      )}
    </div>
  )
}

FreeShipping.defaultProps = {
  valueOfFreeShipping: 1,
  infoLabel: {
    labelInitial: 'Valor actual:',
    labelBetween: '¡Faltan ',
    labelFinal: 'para que su envío sea totalmente gratis!',
    labelFreeShippingComplete: '¡Su envio es totalmente gratis!',
  },
  show: {
    freeShippingComponent: true,
    informativeFreeShippingText: true,
    percentageFreeShipping: true,
    rangeFreeShipping: true,
    labelInitial: true,
    subTotal: true,
    labelBetween: true,
    missingForFreeShipping: true,
    labelFinal: true,
    labelFreeShippingComplete: true,
  },
}

FreeShipping.schema = {
  title: 'admin/editor.free-shipping.title',
  description: 'admin/editor.free-shipping.description',
  type: 'object',
  properties: {
    valueOfFreeShipping: {
      title: 'admin/editor.free-shipping.valueOfFreeShipping.title',
      type: 'number',
    },
    infoLabel: {
      title: '',
      type: 'object',
      properties: {
        labelInitial: {
          title: 'admin/editor.free-shipping.infoLabel.labelInitial.title',
          type: 'string',
        },
        labelBetween: {
          title: 'admin/editor.free-shipping.infoLabel.labelBetween.title',
          type: 'string',
        },
        labelFinal: {
          title: 'admin/editor.free-shipping.infoLabel.labelFinal.title',
          type: 'string',
        },
        labelFreeShippingComplete: {
          title:
            'admin/editor.free-shipping.infoLabel.labelFreeShippingComplete.title',
          type: 'string',
        },
      },
    },
  },
}

export default FreeShipping
