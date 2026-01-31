/**
 * @file pages/Hotel/RoomCalendar.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { Button, DatePicker, Space } from '@derbysoft/neat-design';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@derbysoft/neat-design-icons';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import './RoomCalendar.scss';

/**
 * Room data interface
 */
interface RoomData {
  id: string;
  name: string;
  roomNumber: string;
}

/**
 * Room calendar component
 * Used to manage hotel room status and bookings in calendar view
 */
const RoomCalendar: FC = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs().add(13, 'day'),
  ]);

  // Mock room data
  const rooms: RoomData[] = [
    { id: '1', name: '豪华双人间 A', roomNumber: '101' },
    { id: '2', name: '商务大床房 B', roomNumber: '201' },
    { id: '3', name: '家庭套房 C', roomNumber: '301' },
    { id: '4', name: '总统套房 D', roomNumber: '401' },
    { id: '5', name: '标准双人间 E', roomNumber: '102' },
    { id: '6', name: '经济大床房 F', roomNumber: '202' },
    { id: '7', name: '豪华套房 G', roomNumber: '302' },
  ];

  /**
   * Generate date columns between start and end date
   */
  const generateDateColumns = () => {
    const [start, end] = dateRange;
    const dates: Dayjs[] = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end, 'day')) {
      dates.push(current);
      current = current.add(1, 'day');
    }

    return dates;
  };

  const dateColumns = generateDateColumns();

  /**
   * Group dates by month
   */
  const datesByMonth = dateColumns.reduce((acc, date) => {
    const monthKey = date.format('YYYY-MM');
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(date);
    return acc;
  }, {} as Record<string, Dayjs[]>);

  /**
   * Navigate to previous date range
   */
  const handlePrevious = () => {
    const days = dateColumns.length;
    setDateRange([dateRange[0].subtract(days, 'day'), dateRange[1].subtract(days, 'day')]);
  };

  /**
   * Navigate to next date range
   */
  const handleNext = () => {
    const days = dateColumns.length;
    setDateRange([dateRange[0].add(days, 'day'), dateRange[1].add(days, 'day')]);
  };

  /**
   * Handle date range change
   */
  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
    }
  };

  return (
    <div className="room-calendar">
      {/* Header */}
      <div className="room-calendar__header">
        <h2 className="room-calendar__title">{t('pages.hotel:roomCalendarTitle')}</h2>
      </div>

      {/* Date Navigation */}
      <div className="room-calendar__date-nav">
        <div className="room-calendar__date-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrevious}
            className="room-calendar__nav-btn"
          />
          <DatePicker.RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            format="YYYY-MM-DD"
            className="room-calendar__date-picker"
          />
          <Button
            icon={<RightOutlined />}
            onClick={handleNext}
            className="room-calendar__nav-btn"
          />
        </div>
        <Button
          icon={<SettingOutlined />}
          className="room-calendar__settings-btn"
        >
          {t('pages.hotel:roomCalendarBtnSettings')}
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="room-calendar__grid-container">
        {/* Month Headers */}
        <div className="room-calendar__month-headers">
          <div className="room-calendar__room-header">
            {t('pages.hotel:roomCalendarColRoom')}
          </div>
          <div className="room-calendar__date-headers">
            {Object.entries(datesByMonth).map(([monthKey, dates]) => (
              <div
                key={monthKey}
                className="room-calendar__month-group"
                style={{ width: `${dates.length * 52}px` }}
              >
                <div className="room-calendar__month-label">
                  {dates[0].format('YYYY年MM月')}
                </div>
                <div className="room-calendar__date-row">
                  {dates.map((date) => (
                    <div key={date.format('YYYY-MM-DD')} className="room-calendar__date-cell">
                      <div className="room-calendar__date-number">{date.format('DD')}</div>
                      <div className="room-calendar__date-weekday">{date.format('ddd')}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Rows */}
        <div className="room-calendar__rooms">
          {rooms.map((room) => (
            <div key={room.id} className="room-calendar__room-row">
              {/* Room Info */}
              <div className="room-calendar__room-info">
                <div className="room-calendar__room-content">
                  <Space>
                    <span className="room-calendar__room-icon">🛏️</span>
                    <div>
                      <div className="room-calendar__room-name">{room.name}</div>
                      <div className="room-calendar__room-number">{room.roomNumber}</div>
                    </div>
                  </Space>
                  <Button type="link" size="small">
                    {t('pages.hotel:roomCalendarBtnEdit')}
                  </Button>
                </div>
                <div className="room-calendar__room-labels">
                  <div className="room-calendar__label">{t('pages.hotel:roomCalendarLabelCheckIn')}</div>
                  <div className="room-calendar__label">{t('pages.hotel:roomCalendarLabelCheckOut')}</div>
                </div>
              </div>

              {/* Date Cells */}
              <div className="room-calendar__date-cells">
                {dateColumns.map((date) => (
                  <div key={date.format('YYYY-MM-DD')} className="room-calendar__cell-group">
                    <div className="room-calendar__cell room-calendar__cell--checkin" />
                    <div className="room-calendar__cell room-calendar__cell--checkout" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCalendar;
