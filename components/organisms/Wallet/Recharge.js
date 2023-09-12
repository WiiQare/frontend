import CardHeader from '../../atoms/Card/Header';
import StripePaymentRecharge from './Summary/Stripe/Recharge';

const RechargeSaving = () => {
  return (
    <div className="p-2 space-y-6 md:py-8 md:px-6 mb-20 md:mb-10">
      <CardHeader
        title={'Récharger mon épargne'}
        breadcrumbs={[
          { link: '/saving', item: 'Épargne de santé' },
          {
            link: '/saving/summary',
            item: 'Récharger mon épargne',
          },
        ]}
        download={false}
      />

      <StripePaymentRecharge />
    </div>
  );
};

export default RechargeSaving;
