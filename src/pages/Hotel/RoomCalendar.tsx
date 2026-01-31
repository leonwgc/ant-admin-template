/**
 * @file pages/Hotel/RoomCalendar.tsx
 * @author leon.wang
 */
import React, { FC, useState, useMemo, useRef, useEffect } from 'react';
import { Button, DatePicker, Radio } from '@derbysoft/neat-design';
import {
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  ImportOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import './RoomCalendar.scss';
import { EditOutlined } from '@derbysoft/neat-design-icons';

const { RangePicker } = DatePicker;

/** Tab type enum */
type TabType = 'inventory' | 'price' | 'status';

/** Room data interface */
interface Room {
  id: string;
  name: string;
  roomNumber: string;
}

/** Date column interface */
interface DateColumn {
  date: Dayjs;
  day: number;
  weekday: string;
  month: number;
  year: number;
}

/** Weekday mapping */
const weekdayMap: Record<string, string> = {
  Mon: '周一',
  Tue: '周二',
  Wed: '周三',
  Thu: '周四',
  Fri: '周五',
  Sat: '周六',
  Sun: '周日',
};

/**
 * Room Control Calendar Component
 * Displays a calendar view for hotel room management with date range up to 60 days
 */
const RoomCalendar: FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  // State for date range (default 29 days matching design)
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs('2025-11-27'),
    dayjs('2025-12-25'),
  ]);

  // Refs for synchronized scrolling
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mock room data
  const rooms: Room[] = useMemo(
    () => [
      { id: '1', name: '高级大床房', roomNumber: '10000101' },
      { id: '2', name: '高级双床房', roomNumber: '10000102' },
      { id: '3', name: '标准大床房', roomNumber: '10000103' },
      { id: '4', name: '标准双床房', roomNumber: '10000104' },
      { id: '5', name: '高级商务大床房', roomNumber: '10000105' },
      { id: '6', name: '高级商务双床房', roomNumber: '10000106' },
    ],
    [],
  );

  // Generate date columns based on date range
  const dateColumns = useMemo(() => {
    const columns: DateColumn[] = [];
    const [start, end] = dateRange;
    let current = start;

    while (current.isBefore(end) || current.isSame(end, 'day')) {
      const weekdayEn = current.format('ddd');
      columns.push({
        date: current,
        day: current.date(),
        weekday: weekdayMap[weekdayEn] || weekdayEn,
        month: current.month(),
        year: current.year(),
      });
      current = current.add(1, 'day');
    }

    return columns;
  }, [dateRange]);

  // Group dates by month
  const datesByMonth = useMemo(() => {
    const grouped: { [key: string]: DateColumn[] } = {};

    dateColumns.forEach((col) => {
      const key = `${col.year}-${col.month}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(col);
    });

    return grouped;
  }, [dateColumns]);

  // Get month label in format "X月, YYYY"
  const getMonthLabel = (year: number, month: number) => {
    return `${month + 1}月, ${year}`;
  };

  // Handle previous date range
  const handlePrevious = () => {
    const days = dateRange[1].diff(dateRange[0], 'day') + 1;
    setDateRange([
      dateRange[0].subtract(days, 'day'),
      dateRange[1].subtract(days, 'day'),
    ]);
  };

  // Handle next date range
  const handleNext = () => {
    const days = dateRange[1].diff(dateRange[0], 'day') + 1;
    setDateRange([
      dateRange[0].add(days, 'day'),
      dateRange[1].add(days, 'day'),
    ]);
  };

  // Handle date range change
  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    if (dates && dates[0] && dates[1]) {
      // Limit to 60 days
      const diff = dates[1].diff(dates[0], 'day');
      if (diff > 60) {
        // Truncate to 60 days
        setDateRange([dates[0], dates[0].add(60, 'day')]);
      } else {
        setDateRange([dates[0], dates[1]]);
      }
    }
  };

  // Disable dates beyond 60 days from start date
  const disabledDate = (current: Dayjs, { from }: { from?: Dayjs }) => {
    if (from) {
      return Math.abs(current.diff(from, 'day')) > 60;
    }
    return false;
  };

  // Synchronized scrolling
  useEffect(() => {
    const headerEl = headerScrollRef.current;
    const bodyRefs = [...bodyScrollRefs.current];

    const handleHeaderScroll = () => {
      if (headerEl) {
        bodyRefs.forEach((ref) => {
          if (ref) {
            ref.scrollLeft = headerEl.scrollLeft;
          }
        });
      }
    };

    const handleBodyScroll = (index: number) => () => {
      const bodyEl = bodyRefs[index];
      if (headerEl && bodyEl) {
        headerEl.scrollLeft = bodyEl.scrollLeft;
        bodyRefs.forEach((ref, i) => {
          if (ref && i !== index) {
            ref.scrollLeft = bodyEl.scrollLeft;
          }
        });
      }
    };

    headerEl?.addEventListener('scroll', handleHeaderScroll);
    bodyRefs.forEach((ref, index) => {
      ref?.addEventListener('scroll', handleBodyScroll(index));
    });

    return () => {
      headerEl?.removeEventListener('scroll', handleHeaderScroll);
      bodyRefs.forEach((ref, index) => {
        ref?.removeEventListener('scroll', handleBodyScroll(index));
      });
    };
  }, [rooms.length]);

  // Tab options
  const tabOptions = [
    { label: '库存', value: 'inventory' },
    { label: '房价', value: 'price' },
    { label: '房态', value: 'status' },
  ];

  return (
    <div className="room-calendar">
      {/* Function Bar */}
      <div className="room-calendar__function-bar">
        <div className="room-calendar__tabs">
          <Radio.Group
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            options={tabOptions}
          />
        </div>
        <div className="room-calendar__actions">
          <Button
            icon={<UnorderedListOutlined />}
            className="room-calendar__action-btn"
          />
          <Button
            icon={<TeamOutlined />}
            className="room-calendar__action-btn"
          />
          <Button
            icon={<ImportOutlined />}
            className="room-calendar__action-btn"
          />
        </div>
      </div>

      {/* Date Selector Row */}
      <div className="room-calendar__date-row">
        <div className="room-calendar__date-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrevious}
            size="large"
            className="room-calendar__nav-btn"
            type="tertiary"
            variant="text"
          />
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            format="YYYY-MM-DD"
            size="large"
            className="room-calendar__range-picker"
            disabledDate={disabledDate}
            separator="~"
          />
          <Button
            icon={<RightOutlined />}
            onClick={handleNext}
            size="large"
            className="room-calendar__nav-btn"
            type="tertiary"
            variant="text"
          />
        </div>

        {/* Date Header */}
        <div className="room-calendar__date-header" ref={headerScrollRef}>
          {Object.entries(datesByMonth).map(([key, dates]) => {
            const [year, month] = key.split('-').map(Number);
            return (
              <div key={key} className="room-calendar__month-group">
                <div className="room-calendar__month-label">
                  {getMonthLabel(year, month)}
                </div>
                <div className="room-calendar__date-columns">
                  {dates.map((col) => (
                    <div
                      key={col.date.format('YYYY-MM-DD')}
                      className="room-calendar__date-cell"
                    >
                      <div className="room-calendar__date-day">{col.day}</div>
                      <div className="room-calendar__date-weekday">
                        {col.weekday}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right scroll button */}
        <Button
          icon={<RightOutlined />}
          size="small"
          className="room-calendar__scroll-btn"
          onClick={() => {
            if (headerScrollRef.current) {
              headerScrollRef.current.scrollLeft += 200;
            }
          }}
        />
      </div>

      {/* Room List */}
      <div className="room-calendar__content">
        <div className="room-calendar__room-list">
          {rooms.map((room, index) => (
            <div key={room.id} className="room-calendar__room-row">
              {/* Room Info Column */}
              <div className="room-calendar__room-info">
                <div className="room-calendar__room-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 13h18v8H3v-8zM3 13V8a2 2 0 012-2h14a2 2 0 012 2v5M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2"
                      stroke="#647075"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="room-calendar__room-details">
                  <div className="room-calendar__room-name">{room.name}</div>
                  <div className="room-calendar__room-number">
                    {room.roomNumber}
                  </div>
                </div>
                <Button
                  className="room-calendar__room-edit-btn"
                  size="small"
                  icon={<EditOutlined />}
                />
              </div>

              {/* Status Labels */}
              <div className="room-calendar__status-labels">
                <div className="room-calendar__status-label">可售</div>
                <div className="room-calendar__status-label">已订</div>
              </div>

              {/* Date Grid Cells */}
              <div
                className="room-calendar__date-grid"
                ref={(el) => {
                  bodyScrollRefs.current[index] = el;
                }}
              >
                {dateColumns.map((col) => (
                  <div
                    key={`${room.id}-${col.date.format('YYYY-MM-DD')}`}
                    className="room-calendar__grid-column"
                  >
                    <div className="room-calendar__grid-cell">-</div>
                    <div className="room-calendar__grid-cell">-</div>
                  </div>
                ))}
              </div>

              {/* Scrollbar indicator */}
              <div className="room-calendar__scrollbar-indicator" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCalendar;
