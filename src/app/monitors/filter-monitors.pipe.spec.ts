import { FilterMonitorsPipe } from './filter-monitors.pipe';
import { IMonitor, ICategory } from './monitor';

describe('FilterMonitorsPipe', () => {
  let pipe: FilterMonitorsPipe;

  beforeEach(function() {
    pipe = new FilterMonitorsPipe();
  });

  const top10IPMonitor: IMonitor = {
    topic: 'Top 10 IP Addresses',
    queryDescription:
      'Investigation - Top 10 IP Addresses using the Open Account pages.',
    categories: [
      { value: 'investigation' },
      { value: 'newlogindefault' },
      { value: 'openaccount' },
    ] as ICategory[],
  } as IMonitor;
  const top10UserAgentMonitor: IMonitor = {
    topic: 'Top 10 User Agents',
    queryDescription:
      'Investigation - Top 10 UserAgents attempting to login in the last minute.',
    categories: [
      { value: 'investigation' },
      { value: 'newlogindefault' },
      { value: 'frm' },
    ] as ICategory[],
  } as IMonitor;
  const australianTurkeyMonitor: IMonitor = {
    topic: 'Australian - Turkey Traffic Betslip',
    queryDescription: 'IP from Turkey hitting our Australian site Betslip',
    categories: [{ value: 'johnsnow' }, { value: 'betslip' }] as ICategory[],
  } as IMonitor;

  const monitors: IMonitor[] = [
    top10IPMonitor,
    top10UserAgentMonitor,
    australianTurkeyMonitor,
  ];

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if no monitors array', () => {
    expect(pipe.transform([], '', [])).toEqual([]);
  });

  it('should return monitors array if no search term and no selected categories', () => {
    expect(pipe.transform(monitors, '', [])).toEqual(monitors);
  });

  it('should return empty array if search term not present', () => {
    expect(pipe.transform(monitors, 'OTS', [])).toEqual([]);
  });

  it('should return filtered array if search term in topic', () => {
    expect(pipe.transform(monitors, 'IP Address', [])).toEqual([
      top10IPMonitor,
    ]);
  });

  it('should return filtered array if search term in query description', () => {
    expect(pipe.transform(monitors, 'Turkey', [])).toEqual([
      australianTurkeyMonitor,
    ]);
  });

  it('should return filtered array if search term in topic, case insensitive', () => {
    expect(pipe.transform(monitors, 'ip address', [])).toEqual([
      top10IPMonitor,
    ]);
  });

  it('should return filtered array if search term in query description, case insensitive', () => {
    expect(pipe.transform(monitors, 'turkey', [])).toEqual([
      australianTurkeyMonitor,
    ]);
  });

  it('should return monitors array if no categories selected', () => {
    expect(pipe.transform(monitors, '', [])).toEqual(monitors);
  });

  it('should return empty array if categories selected not present', () => {
    expect(pipe.transform(monitors, '', ['fake'])).toEqual([]);
  });

  it('should return filtered array of monitors that contain the selected category', () => {
    expect(pipe.transform(monitors, '', ['investigation'])).toEqual([
      top10IPMonitor,
      top10UserAgentMonitor,
    ]);
  });

  it('should return filtered array of monitors that contain either of the selected categories', () => {
    expect(pipe.transform(monitors, '', ['betslip', 'frm'])).toEqual([
      top10UserAgentMonitor,
      australianTurkeyMonitor,
    ]);
  });

  it('should return filtered array of monitors that contain search term and category', () => {
    expect(pipe.transform(monitors, 'Top', ['openaccount'])).toEqual([
      top10IPMonitor,
    ]);
  });

  it('should return empty array if search term found but not selected category', () => {
    expect(pipe.transform(monitors, 'fake', ['openaccount'])).toEqual([]);
  });

  it('should return empty array if selected category found but not search term', () => {
    expect(pipe.transform(monitors, 'Top', ['fake'])).toEqual([]);
  });
});
