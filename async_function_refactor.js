async function getArtistInsights(query) {
  const { id, limit, weight, daysAgo, newsFormat } = query;
  let finalWeight = weight;

  // Calculate weight if not provided
  if (finalWeight === undefined) {
    const counts = await snowflakeClientExecuteQuery(
      QUERIES.QUERY_GET_ARTIST_INFO.ARTIST_INSIGHTS.GET_INSIGHTS_COUNT(
        id,
        8,
        4,
        daysAgo
      )
    );

    const high = counts[0]?.count || 0;
    const medium = counts[1]?.count || 0;
    finalWeight = high ? 8 : medium ? 4 : 1;
  }

  // Fetch artist insights
  const sfResult = await snowflakeClientExecuteQuery(
    QUERIES.QUERY_GET_ARTIST_INFO.ARTIST_INSIGHTS.GET_ARTIST_INSIGHTS(
      id,
      limit * 10,
      finalWeight,
      daysAgo
    )
  );

  // Filter and format insights
  const filteredResults = filterResults(sfResult);

  const formattedResults = await Promise.all(
    filteredResults.map(async (result) => {
      return await formatInsight(result);
    })
  );

  // Filter out null results and slice the result set
  const validResults = formattedResults.filter(result => result !== null);
  const slicedResults = validResults.slice(0, limit + (10 - finalWeight) * 200);

  // Process insights into news format if needed
  const finalInsights = await Promise.all(
    slicedResults.map(async (result) => {
      const news = await insightToNews(result);
      return newsFormat ? news : result;
    })
  );

  // Return the final result with or without weight depending on the newsFormat
  return newsFormat ? { insights: finalInsights, weight: finalWeight } : finalInsights;
}
