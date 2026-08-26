/**
 * @file pages/ahooks/useDynamicListDemo.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';

import { Button, Card, Input, Space, Typography } from '@derbysoft/neat-design';
import { useDynamicList } from 'ahooks';

const { Paragraph, Text, Title } = Typography;

const initialList = ['Learn useDynamicList', 'Add an item', 'Reorder the list'];

/**
 * Demonstrates dynamic list operations provided by ahooks.
 */
const UseDynamicListDemo: FC = () => {
	const {
		list,
		batchRemove,
		getKey,
		insert,
		move,
		push,
		remove,
		replace,
		resetList,
	} = useDynamicList<string>(initialList);

	return (
		<Card>
			<Title level={2}>useDynamicList</Title>
			<Paragraph>
				Manage an editable list with stable keys and built-in operations for adding, removing,
				replacing, and reordering items.
			</Paragraph>

			<Space direction="vertical" size="middle" style={{ width: '100%' }}>
				{list.map((item, index) => (
					<Space key={getKey(index)} wrap>
						<Text>{index + 1}.</Text>
						<Input
							value={item}
							onChange={(event) => replace(index, event.target.value)}
							style={{ width: 280 }}
							aria-label={`List item ${index + 1}`}
						/>
						<Button onClick={() => move(index, index - 1)} disabled={index === 0}>
							Move up
						</Button>
						<Button
							onClick={() => move(index, index + 1)}
							disabled={index === list.length - 1}
						>
							Move down
						</Button>
						<Button danger onClick={() => remove(index)} disabled={list.length === 1}>
							Remove
						</Button>
					</Space>
				))}

				<Space wrap>
					<Button type="primary" onClick={() => push(`New item ${list.length + 1}`)}>
						Add to end
					</Button>
					<Button onClick={() => insert(0, 'Inserted at the beginning')}>Insert at beginning</Button>
					<Button
						onClick={() =>
							batchRemove(
								list.map((_, index) => index).filter((index) => index % 2 === 1)
							)
						}
					>
						Remove even rows
					</Button>
					<Button onClick={() => resetList(initialList)}>Reset</Button>
				</Space>

				<Text code>{JSON.stringify(list)}</Text>
			</Space>
		</Card>
	);
};

export default UseDynamicListDemo;
