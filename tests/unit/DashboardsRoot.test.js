import { mount } from '@vue/test-utils';
import DashboardsRoot from '@/components/Dashboards/DashboardsRoot.vue';

test('Stats table has rows', () => {
  const data = [];
  const labels = [];

  const wrapper = mount(DashboardsRoot, {
    propsData: {
      profits: { data, labels },
      odds: { data, labels },
      stats: { data: [{}], columns: ['test'] },
      upsets: { data, labels },
    },
  });

  const rows = wrapper.findAll('tr > td');

  expect(rows.length).toBeGreaterThan(0);
});

test('Stats table is empty', () => {
  const data = [];
  const labels = [];

  const wrapper = mount(DashboardsRoot, {
    propsData: {
      profits: { data, labels },
      odds: { data, labels },
      stats: { data, labels },
      upsets: { data, labels },
    },
  });

  const rows = wrapper.findAll('tr > td');

  expect(rows.length).toBe(0);
});