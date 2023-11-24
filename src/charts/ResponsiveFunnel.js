import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';

const ResponsiveFunnelChart = ({ data }) => (
    <ResponsiveFunnel
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        // valueFormat=">-.4s"
        colors={{ scheme: 'spectral' }}
        borderWidth={20}
        enableLabel={false}
        labelColor={{
            from: 'color',
            modifiers: [['darker', 3]],
        }}
        // enableBeforeSeparators={false}
        // enableAfterSeparators={false}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
    />
);

export default ResponsiveFunnelChart;
