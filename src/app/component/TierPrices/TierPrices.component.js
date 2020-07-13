/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { formatCurrency, roundPrice } from 'Util/Price';
import { ProductType } from 'Type/ProductList';
import './TierPrices.style';

/** @namespace Component/TierPrices/Component */
export class TierPrices extends ExtensiblePureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        isLowestPrice: PropTypes.bool
    };

    static defaultProps = {
        isLowestPrice: false
    };

    renderDetailedTierPrice = ({
        discount: {
            percent_off
        },
        final_price: {
            value,
            currency
        },
        quantity
    }) => {
        const {
            product: {
                price_range: {
                    minimum_price: {
                        final_price: {
                            value: minPriceForOneUnit
                        }
                    }
                }
            }
        } = this.props;

        // Don't show offers that make no sense
        if (value >= minPriceForOneUnit) {
            return null;
        }

        return (
            <li block="TierPrices" elem="Item" key={ quantity }>
                { __(
                    'Buy %s for %s%s each and ',
                    quantity,
                    formatCurrency(currency),
                    roundPrice(value)
                ) }
                <strong>
                    { __(
                        'save %s%',
                        Math.round(percent_off)
                    ) }
                </strong>
            </li>
        );
    };

    renderLowestTierPrice() {
        const {
            product: {
                price_tiers,
                price_range: {
                    minimum_price: {
                        final_price: {
                            currency
                        }
                    }
                }
            }
        } = this.props;

        const lowestValue = price_tiers
            .reduce((acc, { final_price: { value } }) => (acc < value ? acc : value), price_tiers[0].final_price.value);

        return (
            <span block="TierPrices" elem="Item" mods={ { isLowest: true } }>
                { __('As low as ') }
                <span block="TierPrices" elem="ItemPrice">
                    { `${ formatCurrency(currency) }${ roundPrice(lowestValue) }` }
                </span>
            </span>
        );
    }

    renderDetailedTierPriceList() {
        const { product: { price_tiers } } = this.props;

        return price_tiers.map(this.renderDetailedTierPrice);
    }

    renderTierPrice() {
        const { isLowestPrice } = this.props;

        if (isLowestPrice) {
            return this.renderLowestTierPrice();
        }

        return this.renderDetailedTierPriceList();
    }

    render() {
        const { product, product: { price_tiers = [] } } = this.props;

        if (!price_tiers || Object.keys(product).length <= 0 || !price_tiers.length) {
            return null;
        }

        return (
            <ul block="TierPrices">
                { this.renderTierPrice() }
            </ul>
        );
    }
}

export default TierPrices;
