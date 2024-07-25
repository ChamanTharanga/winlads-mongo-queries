db.Subscription.aggregate([
  {
    $lookup: {
      from: "SubscriptionPlan",
      localField: "subId",
      foreignField: "_id",
      as: "subscriptionPlan"
    }
  },
  {
    $unwind: "$subscriptionPlan"
  },
  {
    $lookup: {
      from: "User",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $unwind: "$user"
  },
  {
    $project: {
      _id: 1,
      userId: 1,
      subId: 1,
      status: 1,
      durationType: 1,
      paymentMethod: 1,
      createdAt: 1,
      updatedAt: 1,
      endsAt: 1,
      cancelledAt: 1,
      isPaymentVerified: 1,
      stripeId: 1,
      stripeSubscriptionId: 1,
      userFullName: "$user.fullName",
      subscriptionPlanTier: "$subscriptionPlan.tier"
    }
  }
])
