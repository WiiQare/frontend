import CardHeader from '../../../atoms/Card/Header';
import StripePayment from './Stripe';

const SummarySaving = () => {
  return (
    <div className="p-2 space-y-6 md:py-8 md:px-6 mb-20 md:mb-10">
      <CardHeader
        title={"Résumé & Premier paiement de l'épargne"}
        breadcrumbs={[
          { link: '/saving', item: 'Épargne de santé' },
          {
            link: '/saving/summary',
            item: "Résumé & Premier paiement de l'épargne",
          },
        ]}
        download={false}
      />

      <StripePayment />
    </div>
  );
};

export default SummarySaving;
