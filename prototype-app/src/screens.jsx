import React from 'react';

// Original Components
import { OriginalCookie } from './components/original/OriginalCookie';
import { OriginalHome } from './components/original/OriginalHome';
import { OriginalMenu } from './components/original/OriginalMenu';
import { OriginalLookbook } from './components/original/OriginalLookbook';
import { OriginalSearchTyping } from './components/original/OriginalSearchTyping';
import { OriginalSearchResults } from './components/original/OriginalSearchResults';
import { OriginalFilter } from './components/original/OriginalFilter';
import { OriginalProductDetail } from './components/original/OriginalProductDetail';
import { OriginalBag } from './components/original/OriginalBag';
import { OriginalCheckout } from './components/original/OriginalCheckout';
import { OriginalPaymentResult } from './components/original/OriginalPaymentResult';
import { OriginalLogin } from './components/original/OriginalLogin';
import { OriginalReturns } from './components/original/OriginalReturns';

// Enhanced Components
import { EnhancedCookie } from './components/enhanced/EnhancedCookie';
import { EnhancedHome } from './components/enhanced/EnhancedHome';
import { EnhancedMenu } from './components/enhanced/EnhancedMenu';
import { EnhancedLookbook } from './components/enhanced/EnhancedLookbook';
import { EnhancedSearchTyping } from './components/enhanced/EnhancedSearchTyping';
import { EnhancedSearchResults } from './components/enhanced/EnhancedSearchResults';
import { EnhancedFilter } from './components/enhanced/EnhancedFilter';
import { EnhancedProductDetail } from './components/enhanced/EnhancedProductDetail';
import { EnhancedBag } from './components/enhanced/EnhancedBag';
import { EnhancedCheckout } from './components/enhanced/EnhancedCheckout';
import { EnhancedPaymentResult } from './components/enhanced/EnhancedPaymentResult';
import { EnhancedLogin } from './components/enhanced/EnhancedLogin';
import { EnhancedReturns } from './components/enhanced/EnhancedReturns';

const getScreenComponent = (flowId, variant) => {
  if (variant === 'original') {
    switch (flowId) {
      case 'cookie': return <OriginalCookie />;
      case 'home': return <OriginalHome />;
      case 'menu': return <OriginalMenu />;
      case 'lookbook': return <OriginalLookbook />;
      case 'search_typing': return <OriginalSearchTyping />;
      case 'search_results': return <OriginalSearchResults />;
      case 'filter': return <OriginalFilter />;
      case 'pdp': return <OriginalProductDetail />;
      case 'bag': return <OriginalBag />;
      case 'checkout': return <OriginalCheckout />;
      case 'payment_result': return <OriginalPaymentResult />;
      case 'account': return <OriginalLogin />;
      case 'returns': return <OriginalReturns />;
      default: return <OriginalHome />;
    }
  } else {
    switch (flowId) {
      case 'cookie': return <EnhancedCookie />;
      case 'home': return <EnhancedHome />;
      case 'menu': return <EnhancedMenu />;
      case 'lookbook': return <EnhancedLookbook />;
      case 'search_typing': return <EnhancedSearchTyping />;
      case 'search_results': return <EnhancedSearchResults />;
      case 'filter': return <EnhancedFilter />;
      case 'pdp': return <EnhancedProductDetail />;
      case 'bag': return <EnhancedBag />;
      case 'checkout': return <EnhancedCheckout />;
      case 'payment_result': return <EnhancedPaymentResult />;
      case 'account': return <EnhancedLogin />;
      case 'returns': return <EnhancedReturns />;
      default: return <EnhancedHome />;
    }
  }
};

export { getScreenComponent };
