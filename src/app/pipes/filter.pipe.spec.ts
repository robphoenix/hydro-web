import { LiveMonitor } from './../monitors/monitor';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  const monitors: LiveMonitor[] = [
    { topic: 'Top 10 IP Addresses' },
    { topic: 'Top 10 User Agents' },
    { topic: 'FRM Monitor' }
  ] as LiveMonitor[];

  beforeEach(function() {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if no monitors array', () => {
    expect(pipe.transform([], '')).toEqual([]);
  });

  it('should return monitors array if no search term', () => {
    expect(pipe.transform(monitors, '')).toEqual(monitors);
  });

  it('should return empty array if search term not present', () => {
    expect(pipe.transform(monitors, 'OTS')).toEqual([]);
  });

  it('should return filtered array', () => {
    expect(pipe.transform(monitors, 'IP Address')).toEqual([
      { topic: 'Top 10 IP Addresses' }
    ] as LiveMonitor[]);
  });
});
