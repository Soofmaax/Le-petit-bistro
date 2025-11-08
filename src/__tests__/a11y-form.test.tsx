import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import ReservationForm from '../components/reservation/ReservationForm';

describe('Accessibility - ReservationForm', () => {
  test('has no detectable a11y violations', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ReservationForm
          times={['11:30', '12:00']}
          blockedBadges={[]}
          defaultValues={{
            date: '',
            time: '',
            guests: '2',
            name: '',
            email: '',
            phone: '',
            message: ''
          }}
          minDate={new Date().toISOString().split('T')[0]}
          isClosed={false}
          error={''}
          onSubmit={() => {}}
          onDateChange={() => {}}
        />
      </I18nextProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});